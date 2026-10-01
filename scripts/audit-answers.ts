// Developer report: typed-answer questions where a second correct answer may
// reasonably exist. Nothing here changes grading — alternatives are added to
// content only after a person checks them. Not shown to students.
//   npx tsx scripts/audit-answers.ts   → docs/ANSWER_AUDIT.md
import { writeFileSync } from 'node:fs';
import { CHALLENGES } from '../lib/foundation/content/challenges';
import { MODULES } from '../lib/foundation/content';
import { DIAGNOSTIC_ITEMS } from '../lib/foundation/diagnostic';
import type { Exercise } from '../lib/foundation/model';
import { BOOKS } from '../lib/ielts/content';
import { answerMode } from '../lib/ielts/question-types';
import { LIBRARY } from '../lib/content/reading-library';

type Row = { id: string; where: string; answer: string; ambiguity: string; review: 'Yes' | 'No — by design' | 'Info' };
const rows: Row[] = [];
const add = (r: Row) => rows.push(r);

const CONTRACTION = /\b\w+(n't|'re|'m|'ve|'ll|'d)\b|\b(it|he|she|that|there|what)'s\b/i;
const FUNCTION_WORDS = new Set(
  'a an the and but or so because although though while when if unless since until as than then to of in on at by for with from into onto about over under between through during before after is am are was were be been being do does did have has had will would can could should must may might shall this that these those it its he she they we you i me him her them us my your our their who which whose whom where what how not no some any much many few little more most less least -'.split(' '),
);

// ---------------------------------------------------------------- Foundation
function walk(node: unknown, out: Exercise[], seen = new Set<unknown>()) {
  if (!node || typeof node !== 'object' || seen.has(node)) return;
  seen.add(node);
  const o = node as Record<string, unknown>;
  if (typeof o.id === 'string' && typeof o.type === 'string' && o.prompt && ['gap', 'correct', 'order', 'spot', 'choice', 'tag', 'write'].includes(o.type)) out.push(o as unknown as Exercise);
  for (const v of Object.values(o)) walk(v, out, seen);
}
const exercises: Exercise[] = [];
walk(MODULES, exercises);
walk(CHALLENGES, exercises);
walk(DIAGNOSTIC_ITEMS, exercises);
const unique = [...new Map(exercises.map((e) => [e.id, e])).values()];
const typed = unique.filter((e) => e.type === 'gap' || e.type === 'correct');

for (const ex of typed) {
  if (ex.type !== 'gap' && ex.type !== 'correct') continue;
  const prompt = ex.prompt.en;
  const answers = ex.accepted;
  const where = `Foundation ${ex.type}`;
  const answer = answers.join(' | ');
  const strict = 'strict' in ex && ex.strict;
  const shortForm = /short form|one word/i.test(prompt);
  const heard = /you hear|listening:/i.test(prompt);

  if (shortForm && answers.some((a) => a.trim().includes(' ') && !a.includes(' · ')) && /short form/i.test(prompt)) {
    add({ id: ex.id, where, answer, ambiguity: 'Prompt asks for the short form, but a full form is also accepted.', review: 'Yes' });
  }
  if (heard && answers.length === 1) {
    add({ id: ex.id, where, answer, ambiguity: 'Listening item: only the word heard is right. Synonyms (e.g. "entrance") must NOT be added.', review: 'No — by design' });
    continue;
  }
  if (strict) continue;
  const contraction = answers.find((a) => CONTRACTION.test(a));
  if (contraction && !shortForm && answers.length === 1) {
    add({ id: ex.id, where, answer, ambiguity: `Contraction "${contraction}" only — the full form may also be acceptable unless the lesson is about short forms.`, review: 'Yes' });
  }
  if (ex.type === 'gap' && answers.length === 1 && /^\d+$/.test(answers[0]) && Number(answers[0]) <= 100)
    add({ id: ex.id, where, answer, ambiguity: 'Small number as digits only: the number in words is not listed.', review: 'Yes' });

  if (ex.type === 'correct' && answers.length === 1 && /rewrite|combine|join|make|change|turn/i.test(prompt) && answers[0].split(' ').length >= 5) {
    add({ id: ex.id, where, answer, ambiguity: 'Open rewrite with one accepted sentence: other word orders or linkers may be correct.', review: 'Yes' });
  }
  if (ex.type === 'gap' && answers.length === 1 && !ex.base && !/ or |:|\//.test(prompt) && !/form|tense|past|plural|article|preposition|pronoun|word in brackets|\(/i.test(prompt + ' ' + (ex.sentence ?? '').replace(/___\s*\(/, '___('))) {
    const word = answers[0].toLowerCase();
    const named = /^[A-Z]/.test(answers[0]) && !/^(Overall|However|Moreover|Therefore|Firstly|Finally)$/.test(answers[0]);
    const posName = /^(noun|verb|adjective|adverb|pronoun|preposition|conjunction|interjection)$/.test(word);
    if (!word.includes(' · ') && !/\d/.test(word) && !named && !posName && !word.split(' ').every((w) => FUNCTION_WORDS.has(w))) {
      add({ id: ex.id, where, answer, ambiguity: 'Open content-word gap with one answer: a synonym may also fit the sentence.', review: 'Yes' });
    }
  }
}

// ---------------------------------------------------------------- IELTS practice tests
let ieltsText = 0;
for (const book of BOOKS)
  for (const test of book.tests)
    for (const section of Object.values(test.sections)) {
      if (!section || !('parts' in section) || section.skill === 'speaking') continue;
      for (const part of section.parts as { groups?: { type: string; questions: { id: string; answer: { accepted: string[] } }[] }[] }[])
        for (const group of part.groups ?? []) {
          if (answerMode(group as never) !== 'text') continue;
          for (const q of group.questions) {
            ieltsText++;
            const a = q.answer.accepted;
            const where = `IELTS ${test.id} ${section.skill}`;
            if (/\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(a.join(' ')) && a.length === 1)
              add({ id: q.id, where, answer: a.join(' | '), ambiguity: 'Date: other date orders ("15 March" / "March 15") are not listed.', review: 'Yes' });
            if (a.some((x) => /\w-\w/.test(x)) && !a.some((x) => / /.test(x)))
              add({ id: q.id, where, answer: a.join(' | '), ambiguity: 'Hyphenated answer: the unhyphenated form is not listed.', review: 'Yes' });
          }
        }
    }

// ---------------------------------------------------------------- Reading Library
let libraryGaps = 0;
for (const p of LIBRARY)
  for (const g of p.groups)
    if (g.kind === 'gap')
      for (const item of g.items) {
        libraryGaps++;
        const a = item.accepted;
        if (a.some((x) => /\w-\w/.test(x)) && !a.some((x) => / /.test(x.replace(/-/g, ''))))
          add({ id: item.id, where: `Reading Library ${p.id}`, answer: a.join(' | '), ambiguity: 'Hyphenated answer: the unhyphenated form is not listed.', review: 'Yes' });
        if (a.length === 1 && a[0].split(' ').length >= 3 && g.maxWords >= 3)
          add({ id: item.id, where: `Reading Library ${p.id}`, answer: a.join(' | '), ambiguity: 'Three-word answer: a shorter phrase from the passage may also be acceptable.', review: 'Yes' });
      }

// ---------------------------------------------------------------- report
const needs = rows.filter((r) => r.review === 'Yes');
const md = `# Answer audit (developer report — not shown to students)

Generated by \`npx tsx scripts/audit-answers.ts\`. Grading is deterministic
(\`lib/answers/validate.ts\`): an answer is right only if it matches the
question's \`correctAnswer\` or one of its \`acceptedAnswers\` after
normalisation (British/American spelling counts as the same; digits and number
words count as the same in IELTS tests and the Reading Library). Nothing in this list was changed automatically — a person adds
an alternative to the content after checking it.

| Checked | Count |
| --- | --- |
| Foundation typed questions (gap / rewrite) | ${typed.length} |
| IELTS practice-test text answers | ${ieltsText} |
| Reading Library gap answers | ${libraryGaps} |
| Flagged — needs review | ${needs.length} |
| Flagged — by design (exact word required) | ${rows.length - needs.length} |

| Question ID | Where | Current answer | Potential ambiguity | Needs review |
| --- | --- | --- | --- | --- |
${rows.map((r) => `| ${r.id} | ${r.where} | ${r.answer.replace(/\|/g, '\\|')} | ${r.ambiguity} | ${r.review} |`).join('\n')}
`;
writeFileSync('docs/ANSWER_AUDIT.md', md);
console.log(`typed ${typed.length}, ielts ${ieltsText}, library ${libraryGaps}, flagged ${rows.length} (${needs.length} need review)`);

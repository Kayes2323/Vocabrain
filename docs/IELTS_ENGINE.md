# IELTS test engine (Phase 4.1)

Computer-based **IELTS practice** (never presented as an official test). The
engine renders any test that fits the content model, so licensed books can be
added without UI changes.

## Content model (`lib/ielts/model.ts`)

```
TestBook → PracticeTest → section (listening | reading | writing | speaking)
  → ObjectivePart (Listening Part 1–4 with audio / Reading Passage 1–3 with paragraphs)
    → QuestionGroup (type, instructions, word limit, shared options, template/table)
      → Question (number, prompt, options) → AnswerKey (accepted[]) + Explanation (text, evidence, distractors)
```

- 18 question types (`lib/ielts/question-types.ts`), each mapped to an answer
  mode: `choice`, `multi-choice`, `select`, `text`. A completion group with a
  word box becomes a `select`. Content decides the type; no test needs them all.
- Completion gaps: `template` text or `table` cells with `{{questionNumber}}`,
  or a single `prompt` with `___`.
- Answer keys: case/space-insensitive; optional words in brackets
  (`"(the) library"`). Word limits follow IELTS counting (hyphenated = one word,
  "AND/OR A NUMBER" allows one extra number). Spelling is strict; near misses are
  tagged `nearMiss` for diagnostics.
- Explanations carry the evidence quote and paragraph, and why tempting
  options are wrong.
- Writing tasks (min words, suggested time) and Speaking parts (cue card,
  prep/speak seconds) are modelled now; their runners come in 4.5/4.6.

## Content rights

Every book and test carries `ContentProvenance`. `isPublishable()` hides
publisher content unless `licenseStatus: 'licensed'`; `pending-review` is never
shown. **Do not add Cambridge IELTS passages, questions, audio or answer keys
without a licence.** The current library holds one original Vocab Brain test
(`lib/ielts/content/demo/practice-test-1.ts`).

Add a book: create its tests as data, list the book in `lib/ielts/content/index.ts`,
run `pnpm test:ielts` (the validator checks numbering, answer keys against
options, gaps, evidence paragraphs and licensing).

## Scoring (`lib/ielts/scoring.ts`), deterministic

`scoreSection()` returns correct/total, per part, per question type and per
question (given, expected, unanswered, nearMiss, overLimit). Choose-TWO groups
score each number, order-free. A band estimate (`rawToBand`) is shown only for
full 40-question sections; smaller sections show the raw score. No AI is used
for Listening/Reading marking.

## Sessions (`lib/ielts/session.ts`)

`users/{uid}/testSessions/{sessionId}` (guests: localStorage). Stores answers,
flags, current question, active time (the timer pauses when the page is hidden)
and, once submitted, the result. Answers save immediately; the timer saves every
15 s and is mirrored on the device every second, so a refresh resumes exactly.
Time running out submits automatically.

Firestore rules validate the shape and make a submitted attempt final (no edits).

## UI (`components/test`)

- `/ielts/tests`: library with in-progress and last-score status.
- `/ielts/tests/{testId}/{skill}`: full-screen runner (no app nav). Desktop:
  passage left, questions right; mobile: Passage / Questions tabs. Header timer,
  question navigator per part, flag for review, review dialog with unanswered
  count, submit.
- Result: score, per passage/part, per question type (weakest first), a
  deterministic "where to focus", answers with explanations and evidence.

## Tests

- `pnpm test:ielts`: content validation, licensing, normalisation, word limits,
  scoring, choose-TWO, band tables, session flow.
- `pnpm test:rules`: includes test-session ownership and immutability.

## Next (4.2+)

Highlighting + Save to Brain in passages, Listening audio player, Writing and
Speaking runners, history/progress, mistake notebook, Mino analysis of results.

# IELTS Foundation

From English Foundation → IELTS Ready. An IELTS-focused foundation course for
students who are not yet confident in the English IELTS needs. It is not a
general "English from zero" course: every lesson shows where it is used in
IELTS Listening, Reading, Writing or Speaking.

## Where it lives

| Route | What |
|---|---|
| `/ielts/foundation` | Dashboard: Mino intro (once), journey, foundation check result, continue card, Mino pattern callout, Level 1–2 modules, levels 1–5, progress per skill |
| `/ielts/foundation/diagnostic` | Foundation check (20 items: grammar, vocabulary, sentence construction, reading, listening) |
| `/ielts/foundation/{moduleId}` | Module: IELTS link, lessons (done / start here / practise again / soon) |
| `/ielts/foundation/lesson/{lessonId}` | Lesson player |

Entry points: IELTS hub (first section, replaces the old "Grammar — planned"
entry), Home journey card ("Continue IELTS Foundation" while the journey is at
Starting point / Foundation), Mino actions `foundation`, `foundation-check`,
`sentence-basics`.

## Content architecture (`lib/foundation`)

Course → Level → Module → Lesson → Step → Exercise, all data:

- `model.ts`: bilingual text `L {en, bn}` (IELTS terms stay in English in
  Bangla), `Lesson {why, minutes, difficulty, skill, steps}`, steps `concept`
  (what) · `examples` (how) · `ielts` (why/where, per skill) · `practice`
  (can I?) · `recall`. Exercises: `choice`, `gap`, `order`, `correct`
  (auto-graded), `write` (self-checked against a model with a checklist).
  Every exercise has an explanation and an error `tag`.
- `content/`: `LEVELS` (1 Foundation, 2 Core, 3 Skill Builder → plan,
  4 Practice → tests, 5 Mock → tests) and `MODULES`. A module lists written
  `lessons` and `planned` titles (shown as "Soon", counted in progress).
- `grade.ts`: tolerant grading (case, spaces, final full stop, curly quotes);
  deterministic word shuffle.
- `progress.ts`: lesson outcome (≥80 strong, 60–79 good, <60 "a little more
  practice"), module/level/skill progress, recommended module, next lesson,
  error-tag counts, top patterns.
- `diagnostic.ts`: items + scoring → Strong (≥80%) / Developing (50–79%) /
  Needs Foundation (<50%), per-area %, focus modules from wrong tags. Strong
  students test out of Level 1 (lessons stay open as optional review).
- `validate.ts`: every lesson has concept, IELTS use, practice (3+), recall,
  3–15 minutes, bilingual text; every exercise's own answer grades correct.

## Storage

`profile.foundation` inside the existing `users/{uid}.app` map (no new
collection, no rules change; works for guests on-device):
`{ introSeenAt, diagnostic, lessons: {id: {score, best, attempts, completedAt}}, errors: {tag: {count, lastAt}} }`.

## Mino

- Snapshot line: check level and areas, lessons done, Level 1 %, next lesson,
  and mistake patterns (counts from real answers).
- Product guide `ielts-foundation`, which says what is still "Soon".
- `/mino?ask=lesson&lesson=…` (explain this lesson + IELTS use) and
  `/mino?ask=foundation&tag=…` (pattern revision).
- Journey: the Foundation stage counts Level 1 progress (or a strong check).

## Content status

Written: Module 1 Sentence Basics (9 lessons). Outlined with lesson titles:
Tenses, Parts of Speech & Word Forms, Articles, Subject–Verb Agreement,
Prepositions, Connectors, Complex Sentences, Punctuation, Common Errors,
Vocabulary Foundation; Level 2: What is IELTS?, Listening/Reading/Writing/
Speaking Foundation. Next steps follow the brief: STEP 5 Tenses onwards,
Readiness Check (STEP 20).

## Tests

`pnpm test:foundation` (content validation, grading, diagnostic levels and
focus, progress, test-out). Browser e2e covered: intro, diagnostic with audio,
module, lesson (right/wrong/rewrite/order/write), result, persistence after
reload, Bangla onboarding on mobile, no horizontal scroll.

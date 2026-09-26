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

## v2: learning engine + Tenses module

**Routes:** `/ielts/foundation/review/{concept}` (5-minute review + 5-question
retest), `/ielts/foundation/quiz/{moduleId}` (quiz over finished lessons).

**Engine (`lib/foundation/progress.ts`)**
- `recordAnswer`: every answer updates today's counters and per-concept
  accuracy; a wrong answer is stored in full (source, question id/type, prompt,
  student answer, correct answer, error category, concept, attempt, time).
  Last 150 mistakes kept.
- `saveInProgress` / `completeLesson`: resume point (page, answers, attempt),
  lesson score / best / attempts.
- `lessonState`: lessons open in order (or by `prerequisites`); lessons skipped
  after the check stay open for review; locked lessons redirect to the next one.
- `adaptiveStart`: needs → first lesson, nothing skipped; developing → skip
  Sentence Basics when sentence construction ≥ 75%, skip tense lessons whose
  concept was answered right (grammar ≥ 67%); strong → skip basics, the tenses
  intro and every proven tense.
- `reviewDue`: 3+ mistakes on a concept in 14 days since its last passed review.
  `reviewQuestions` retests up to 2 missed questions. Pass = 80%.
- `topicSummary` (strong / weak / review / learning), `foundationJourney`
  (done / current / locked), `dailyGoal`, `foundationDailyPlan` (trimmed to
  the student's daily minutes), `nextAction` (one button), and
  `foundationSummaryLines` (Mino's data).

**Content:** Module 2 Tenses (`content/tenses.ts`, `tenses-2.ts`): 12 lessons,
7 concepts, 67 exercises; choice/gap/correct items carry `why` for common
wrong answers. The last lesson is a `kind: 'test'` review test.

**Mino:** `getFoundationProgress` tool (topics, review due, recent mistakes,
next step) and snapshot lines built only from stored data; `/mino?ask=foundation-review`.

**Storage fix:** the profile is saved with `mergeFields` so removed nested
fields (e.g. a finished lesson's resume point) are really removed. No Firestore
rules change.

## v3: problem-first lessons (Tenses 1–2), spaced review, mastery

See `docs/TENSES_CURRICULUM.md` for the full 15-stage Tenses map.

- **New step kinds** (`lib/foundation/model.ts`): `hook` (the student answers a
  real situation before any teaching; every option has a diagnosis),
  `discover` (examples → the student names the pattern → notes + pattern
  revealed), `mistakes` (Common Mistake Lab, tap to reveal), timeline cards on
  `concept`, and practice `mode`: `practice` (easy → hard), `recall` (no
  options) and `personal` (a `write` task with `mino`). `format: 'v2'` lessons
  are validated for all of these.
- **Content:** `content/tenses-v2.ts` — Understanding Time (t-1) and Present
  Simple (t-2). Ids unchanged, so existing progress stays valid.
- **Mino feedback:** `POST /api/mino/foundation-feedback` (signed-in, rate
  limited, fast model, JSON validated with zod; quotes must exist in the
  student's text; the student's text is isolated as data). Busy / signed-out →
  model answer + checklist, with "Ask Mino again".
- **Spaced review:** `completeLesson` schedules the lesson concept (same day,
  3 h); `recordReview` moves it through 1, 3, 7, 14, 30 days; a miss → tomorrow.
  `dueReviews` = repeated-mistake reviews first, then scheduled ones.
- **Mastery:** `conceptMastery` = recognition (≥80% on 3+ choice answers),
  recall (2+ typed answers right), application (a personal sentence Mino judged
  correct), consistency (2+ passed spaced reviews). Shown after each lesson.
- **Error memory:** Mino-judged sentences that need work are stored as
  mistakes (`questionType: 'write'`, the student's text and Mino's correction).

## v4: Parts of Speech (module 3)

Route: `/ielts/foundation/parts-of-speech` (units dashboard), `/ielts/foundation/parts-of-speech/<unit>`,
targeted fixes at `/ielts/foundation/fix/<expected>><chosen>`.

- **Units.** `Module.units` groups lessons (`Lesson.unit`). 12 units in the recommended order
  (`content/pos-units.ts`); 14 lessons written: Noun 1–4, Adjective 1–4, Adverb 1–4, Word Forms 1–2.
  Everything is open; inside a unit, the previous lesson is the recommended step (guide reminder).
- **Lesson loop.** hook → identify (tag each word's job, no rule yet) → concept → examples → IELTS →
  mistakes → guided practice → practice without options → mini challenge → own sentence (Mino) → remember.
- **Question types.** `tag` (tap words, choose jobs), `spot` (tap the wrong word, then fix it),
  transform (`gap` with `base`). Builders in `content/pos-kit.ts`.
- **Error pairs.** Exercises carry `pos` (job needed) and `wrongPos` (job of each wrong answer).
  Mistakes store `pos: [{expected, chosen}]` and `family`. `posPatterns()`: the same pair 3× in 14 days
  (or 2 in a row) is a pattern; `fixQuestions()` builds a 5-question fix; `recordFix()` at 80%+ closes it.
- **Status.** `unitStatus()`: new / learning / practising / review / mastered, from concept stats
  (the four mastery checks), open patterns, failed or overdue reviews. Spaced review reuses the
  concepts `pos-noun`, `pos-adjective`, `pos-adverb`, `pos-forms`.
- **Mino.** `posSummaryLines()` adds unit status with accuracy, open patterns with the student's own
  sentence, and weak word families to the snapshot; product guide `parts-of-speech`; action `parts-of-speech`.

### Phase 2

- **Content.** 32 lessons: + Verb 1–5 (`pos-verb.ts`), Pronoun 1–3, Preposition 1–3, Conjunction 1–3,
  Interjection 1, Word Forms 3–5 (word families, prefixes, word forms in IELTS). Concepts added:
  `pos-verb`, `pos-pronoun`, `pos-preposition` (tag `preposition`), `pos-conjunction` (tag `connector`),
  `pos-interjection`. Still planned: Parts of Speech in IELTS, Common Mistakes Lab, Final Mastery Challenge.
- **Unit check.** `/ielts/foundation/<module>/<unit>/check`: `unitCheckQuestions()` gives 8 graded
  questions from the unit's finished lessons (up to 3 recent mistakes first); the score is recorded
  with `recordReview()` on the unit's concept, so it moves the spaced review. `canUnitCheck()` needs
  a concept and at least 5 questions.
- **Fixes for every job.** `fixQuestions()` falls back to tag exercises and the expected job's unit
  questions, so pronoun / preposition / conjunction confusions get a full 5-question fix. A pattern
  opens only when a full fix exists (e.g. never for determiner, which has no unit).
- **Validation.** A spot item's corrected sentence must not repeat a word ("must submit submit"):
  a fix that needs a deletion must be written as a correct / choice item instead.

### Phase 3: IELTS application and mastery

- **Parts of Speech in IELTS** (`pos-ielts-a.ts`, `pos-ielts-b.ts`, concept `pos-ielts`): 9 v2 lessons:
  Reading (unknown words, predict the gap), Listening (predict the answer), Writing (the word that
  breaks the sentence, building an academic sentence), Speaking (upgrade your answer; natural spoken
  English is never marked wrong), word-form clues, grammar + vocabulary (collocations), application challenge.
- **Common Mistakes Lab** (`pos-lab.ts`, concept `pos-lab`, lesson `format: 'lab'`): 8 repair stations
  (noun, verb, pronoun, adjective/adverb, preposition, conjunction, word form, subject–verb). A repair
  is a typed spot-and-fix followed by a "why" question; then 3 targeted questions without options.
  `validateLab()` enforces this. "Your own mistakes first": `ownMistakeQuestions()` (last 14 days,
  newest first) at `/ielts/foundation/parts-of-speech/lab/mine`.
- **Named patterns** (same error system, no new tracking): exercises may carry `pattern`
  (`sv-agreement`, `verb-form`, `noun-count`, `pronoun-form`, `prep-choice`, `conj-logic`;
  catalogue in `content/pos-patterns.ts`). Preposition, conjunction and pronoun questions default to
  their concept's pattern (`CONCEPT_PATTERN`, never for tagging). Mistakes store `pattern`;
  `posPatterns()` counts job pairs and named patterns together; `fixQuestions()` uses the pattern's own
  questions; `/ielts/foundation/fix/<pattern>` works like a pair fix.
- **Fix guide.** `POS_FIX_GUIDE[key]`: rule (before), then after the 5 questions: what you were
  confusing (with the student's own latest answer), why it happens, how to recognise it, how to avoid it.
- **Final Mastery Challenge** (`pos-final.ts`, unit `challenge: true`): 10 parts A–J × 4 items
  (levels 1–3); 3 served per part (30). `finalStartLevel()` from PoS accuracy; `nextFinalLevel()`
  (right → up, wrong → down); `pickFinalItem()` = closest unused level. `recordFinal()` stores
  `posFinal` (score, best, attempts, level, parts). Unit status: new → review (<80%) → mastered.
  The report: by part, by word job, level reached, what to practise next, Ask Mino. Never an IELTS band.
- **Mino.** Sentence feedback explains each fix with the student's own words and returns one
  follow-up gap (`practice`, validated: exactly one `___`, only when something was wrong).
  Snapshot lines add named patterns and the final result.

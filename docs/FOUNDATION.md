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

LEVEL 1 — Foundation Grammar: Sentence Basics (9 lessons), Tenses for IELTS
(15 lessons + the Tenses Final Mastery Challenge), Parts of Speech (12 units),
Articles (9 lessons + the Articles Final Mastery Challenge), Subject–Verb
Agreement, Prepositions, Connectors, Complex Sentences, Punctuation, Common
Errors and Vocabulary Foundation (9 lessons + a Final Mastery Challenge each;
Vocabulary also links to the daily word missions).
LEVEL 2 — IELTS Basics: What is IELTS?, Understanding IELTS Listening,
Understanding IELTS Reading, Understanding IELTS Writing and Understanding IELTS
Speaking (9 lessons + a Final Mastery Challenge each). Every Foundation module
now has lessons; no module card shows "Soon". See `docs/TENSES_CURRICULUM.md`, `docs/ARTICLES_CURRICULUM.md`,
`docs/AGREEMENT_CURRICULUM.md`, `docs/PREPOSITIONS_CURRICULUM.md`,
`docs/CONNECTORS_CURRICULUM.md`, `docs/COMPLEX_CURRICULUM.md`,
`docs/PUNCTUATION_CURRICULUM.md`, `docs/COMMON_ERRORS_CURRICULUM.md`,
`docs/VOCABULARY_CURRICULUM.md`, `docs/IELTS_INTRO_CURRICULUM.md`,
`docs/LISTENING_CURRICULUM.md`, `docs/READING_CURRICULUM.md`,
`docs/WRITING_CURRICULUM.md` and `docs/SPEAKING_CURRICULUM.md`.

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

## Phase A: Tenses v2 + completion

- **All 14 taught Tenses lessons in v2 (+ the t-12 review test)** (`tenses-v2.ts` t-1/t-2, `tenses-core.ts` t-3…t-8,
  `tenses-apply.ts` t-9…t-11, `tenses-new.ts` t-13…t-15, `tenses-2.ts` t-12 review test).
  Old exercise ids were kept, so earlier answers and reviews still count. Order:
  simple → continuous → perfect → perfect continuous → past perfect → future →
  comparisons → mistakes → Writing → Speaking → mixed → review test.
- **Concepts.** `present-perfect-continuous` added (9 tense concepts). Application
  lessons (t-9…t-11, t-14, t-15) have no lesson concept; each question keeps the concept
  of the tense it tests (`validateV2` enforces it), and each has a Mino task on a real concept.
- **No fake mastery.** `recordReview()` only counts a spaced pass when the review was due;
  a review repeated early is practice and leaves the schedule unchanged.
- **Patterns.** `POS_NAMED_PATTERNS` entries carry `modules`; tense patterns
  `past-vs-perfect`, `simple-vs-continuous`, `tense-time` (+ shared `verb-form`,
  `sv-agreement`). `patternsFor(fp, moduleId)` shows each module its own patterns;
  fix questions for a named pattern come from every module.
- **Challenges.** `content/challenges.ts` (`CHALLENGES`, `getChallenge`, `challengeForModule`)
  generalises the final challenge: `pos` (stored in `posFinal`, as before) and `tenses`
  (stored in `finals.tenses`). Route `/ielts/foundation/challenge/<id>`; the module page lists it.
  `validateFoundation()` checks each challenge (parts, levels, known concepts, ≥30% free recall).
- **Mino.** Tense tasks add rules to the sentence check (deciding time word, tense vs form,
  a follow-up on the same decision). The guide lists the 15 lessons and the challenge and never
  presents "Soon" modules as available. Snapshot adds open Tenses patterns and the challenge result.
- **E2E** (committed): `scripts/e2e/` — `run.sh` (emulators + mock Gemini + `next dev`),
  `helpers.ts` (answers from the real content), `tenses.e2e.ts`. Run `pnpm test:e2e:tenses`.

## Phase B: Articles

- **Module 4 Articles** (`articles.ts` ar-1…ar-4, `articles-apply.ts` ar-5…ar-9): 8 taught
  v2 lessons + the review test. Four concepts (`article-a-an`, `article-a`, `article-the`,
  `article-zero`); application lessons keep each question on its own concept.
  "No article" is an option `(no article)` or, when typed, `-` / `no article` / `x`.
- **Patterns.** `missing-article`, `general-the`, `a-an-sound` (+ fix guides); `noun-count`
  now belongs to Parts of Speech and Articles. The snapshot lists open Articles patterns.
- **Challenge.** `articles` in `CHALLENGES` (6 parts, 18 of 24 items, `finals.articles`).
  Every challenge now has a short `name`: the report groups "Topic by topic" (Tenses keep
  "Tense by tense"), and Ask Mino says "Ask Mino about my {name} report".
- **Mino.** Article tasks add article rules to the sentence check (the noun, the deciding
  question, a/an by sound, uncountables, one follow-up). The guide lists the module and the
  challenge; the snapshot shows every challenge result.
- **E2E.** `scripts/e2e/articles.e2e.ts`; `pnpm test:e2e` runs Tenses and Articles on one
  server start (`pnpm test:e2e:articles` for one).


## Phase C: Subject–Verb Agreement

- **Module 5** (`agreement.ts` sva-1…sva-5, `agreement-apply.ts` sva-6…sva-9): 8 taught v2
  lessons + the review test. Five concepts (`sva-basic`, `sva-compound`, `sva-indefinite`,
  `sva-long`, `sva-quantity`, tag `agreement`). See `docs/AGREEMENT_CURRICULUM.md`.
- **Patterns.** `sva-compound`, `sva-indefinite`, `sva-long-subject`, `sva-quantity` (+ fix
  guides); `sv-agreement` now also shows on the Agreement page. Open Agreement patterns are
  in the Mino snapshot.
- **Challenge.** `agreement` in `CHALLENGES` (6 parts × 4 items, 18 served, `finals.agreement`).
- **Mino.** Agreement tasks add agreement rules to the sentence check (quote the verb, name
  its real subject, one or more; British collective plurals are not marked wrong).
- **E2E.** `scripts/e2e/agreement.e2e.ts` (`pnpm test:e2e:agreement`); part of `pnpm test:e2e`.

## Phase D: Prepositions

- **Module 6** (`prepositions.ts` pr-1…pr-6, `prepositions-apply.ts` pr-7…pr-9): 8 taught v2
  lessons + the review test. Six concepts (`prep-time`, `prep-duration`, `prep-place`,
  `prep-movement`, `prep-partner`, `prep-data`, tag `preposition`). The Parts of Speech unit
  (ppp-1…ppp-3) stays the short introduction. See `docs/PREPOSITIONS_CURRICULUM.md`.
- **Patterns.** `prep-time-words`, `prep-place-words`, `prep-word-partner`, `prep-data-words`,
  `prep-extra` (+ fix guides); `prep-choice` from Parts of Speech also shows here.
- **Challenge.** `prepositions` in `CHALLENGES` (6 parts × 4 items, `finals.prepositions`).
- **Mino.** Preposition tasks add preposition rules to the sentence check (the one deciding
  reason, extra / missing prepositions, change vs level for data).
- **E2E.** `scripts/e2e/prepositions.e2e.ts` runs the shared grammar-module flow in
  `scripts/e2e/module-spec.ts` (later modules reuse it with their own data).

## Phase E: Connectors

- **Module 7** (`connectors.ts` cn-1…cn-6, `connectors-apply.ts` cn-7…cn-9): 8 taught v2
  lessons + the review test. Six concepts (`conn-add`, `conn-contrast`, `conn-cause`,
  `conn-example`, `conn-grammar`, `conn-cohesion`, tag `connector`). The Parts of Speech
  conjunction unit stays the short introduction. See `docs/CONNECTORS_CURRICULUM.md`.
- **Patterns.** `conn-meaning`, `conn-double`, `conn-form`, `conn-fragment` (+ fix guides);
  `conj-logic` from Parts of Speech also shows here.
- **Challenge.** `connectors` in `CHALLENGES` (6 parts × 4 items, `finals.connectors`).
- **Mino.** Connector tasks add linking rules (logic, grammar after the linker, comma
  splices, pairs, fragments; natural referencing over connector overuse).
- **E2E.** `scripts/e2e/connectors.e2e.ts` (shared flow in `module-spec.ts`).
- **Answers with punctuation.** Grading keeps commas and semicolons, so every accepted
  rewrite lists each correct punctuation (". However," / "; however," / ", but").

## Phase F: Complex Sentences

- **Module 8** (`complex.ts` cx-1…cx-6, `complex-apply.ts` cx-7…cx-9): 8 taught v2 lessons +
  the review test. Six concepts (`cx-clause`, `cx-adverbial`, `cx-time-if`, `cx-relative`,
  `cx-relative-comma`, `cx-noun-clause`, tag `complex-sentence`). See
  `docs/COMPLEX_CURRICULUM.md`.
- **Patterns.** `cx-fragment-runon`, `cx-comma`, `cx-clause-form`, `cx-clause-tense`,
  `cx-relative-form`, `cx-word-order` (+ fix guides).
- **Challenge.** `complex-sentences` in `CHALLENGES` (6 parts × 4 items).
- **Mino.** Complex-sentence tasks add clause rules (accuracy first; fragments, run-ons,
  will after when / if, repeated pronouns, relative words, indirect-question word order).
- **E2E.** `scripts/e2e/complex.e2e.ts` (shared flow in `module-spec.ts`).
- **Respectful Bangla.** The shared unit check rejects তুমি / তোমার / তুই in every grammar
  module; older Foundation lessons were cleaned of informal verb forms (বসাও → বসান,
  দেখবে → দেখবেন, শিখলে → শিখলেন).

## Phase G: Punctuation & Capitalisation

- **Module 9** (`punctuation.ts` pu-1…pu-6, `punctuation-apply.ts` pu-7…pu-9): 8 taught v2
  lessons + the review test. Six concepts (`pn-capital`, `pn-end`, `pn-comma`,
  `pn-comma-error`, `pn-apostrophe`, `pn-colon`, tag `punctuation`). Lesson ids use `pu-`
  because `pn-` is taken by the Parts of Speech noun unit. See
  `docs/PUNCTUATION_CURRICULUM.md`.
- **Strict grading.** Gap, correct and spot exercises accept `strict: true`: capitals and
  final punctuation count, spacing and curly quotes are still forgiven (`strictAnswer`,
  `answerKey` in `grade.ts`). Used only where the answer IS the capital or the end mark.
- **Patterns.** `pn-capitals`, `pn-end-mark`, `pn-run-on`, `pn-comma-use`, `pn-apostrophes`,
  `pn-colon-semi` (+ fix guides). **Challenge** `punctuation` (6 parts × 4 items).
- **Mino.** Punctuation tasks judge punctuation and capitals only, one rule per issue.
- **E2E.** `scripts/e2e/punctuation.e2e.ts` (shared flow in `module-spec.ts`).

## Phase H: Common Errors to Fix

- **Module 10** (`common-errors.ts` ce-1…ce-6, `common-errors-apply.ts` ce-7…ce-9): 8
  taught v2 lessons + the review test. Six concepts (`ce-translation`, `ce-countable`,
  `ce-plural`, `ce-collocation`, `ce-word-pair`, `ce-natural`) under a new error tag
  `common-error`; the module also lists `collocation`, `plural` and `countable` so
  mistakes with those tags point here. See `docs/COMMON_ERRORS_CURRICULUM.md`.
- **Patterns.** `ce-translation`, `ce-uncountable`, `ce-plural-form`, `ce-collocation-pair`,
  `ce-confused-pair`, `ce-redundant` (+ fix guides). **Challenge** `common-errors`
  (6 parts × 4 items).
- **Mino.** Common-error tasks name the error type (translation, uncountable, plural,
  collocation, word pair, repetition) and the Bangla cause, one fix per error. The Mino
  product knowledge no longer lists modules 5–10 as "Soon" (that line had gone stale).
- **E2E.** `scripts/e2e/common-errors.e2e.ts` (shared flow in `module-spec.ts`).

## Phase I: Vocabulary Foundation lessons

- **Module 11** (`vocabulary.ts` vc-1…vc-6, `vocabulary-apply.ts` vc-7…vc-9): 8 taught v2
  skill lessons + the review test, tag `vocabulary`, concepts `voc-learn`, `voc-context`,
  `voc-paraphrase`, `voc-register`, `voc-precise`, `voc-use`. See
  `docs/VOCABULARY_CURRICULUM.md`.
- **One word system.** The lessons teach how to learn and use words; the words themselves
  stay in the existing daily word missions (`lib/vocab-foundation`, saved to the Brain).
  The module no longer has `href`: its card opens the module page, which links to the
  missions through the new `Module.practice` row. No second word store.
- **Patterns.** `voc-word-pattern`, `voc-context-clue`, `voc-synonym-fit`,
  `voc-register-mix`, `voc-vague-word`, `voc-form-tone` (+ fix guides). **Challenge**
  `vocabulary-foundation` (6 parts × 4 items).
- **Mino.** Vocabulary tasks judge word choice only and name one check per issue
  (pattern, synonym, register, precision, form, tone, word parts); accuracy before rarity.
- **E2E.** `scripts/e2e/vocabulary.e2e.ts`; `module-spec.ts` accepts an optional
  `practiceLink` and checks it opens the missions.

## Phase J: LEVEL 2 — What is IELTS?

- **Module** `ielts-intro` (`ielts-intro.ts` ib-1…ib-6, `ielts-intro-apply.ts` ib-7…ib-9):
  8 taught v2 lessons + the review test, tag `ielts-basics`, concepts `ib-versions`,
  `ib-format`, `ib-delivery`, `ib-bands`, `ib-marking`, `ib-plan`. See
  `docs/IELTS_INTRO_CURRICULUM.md`.
- **Facts only.** Every fact matches `lib/ai/server/mino/knowledge/ielts.ts`. Fees, dates,
  result times, retakes and institution requirements are never stated; lessons point to the
  official IELTS / test centre website or the organisation's page. A unit test checks the
  band arithmetic of the examples and that no fee appears.
- **Knowledge lessons** name a "Common mix-up" in each concept step instead of a Bangla
  grammar slip.
- **Patterns.** `ib-version-fact`, `ib-format-fact`, `ib-delivery-fact`, `ib-band-calc`,
  `ib-marking-fact`, `ib-requirement` (+ fix guides). **Challenge** `ielts-intro`.
- **Mino.** For `ielts-basics` tasks the base prompt judges IELTS facts first (grammar only
  where it blocks meaning), never states fees or dates, and treats scores as estimates.
- **E2E.** `scripts/e2e/ielts-intro.e2e.ts`. The shared spec escapes regex characters in
  module names ("What is IELTS?").

## Phase K: LEVEL 2 — Understanding IELTS Listening

- **Module** `listening-foundation` (`listening.ts` ls-1…ls-6, `listening-apply.ts`
  ls-7…ls-9), tag `listening`, concepts `ls-format`, `ls-part1`…`ls-part4`, `ls-rules`.
  Transcript-based practice (no audio needed). See `docs/LISTENING_CURRICULUM.md`.
- **Patterns.** `ls-format-fact`, `ls-spelling-number`, `ls-distractor`,
  `ls-map-language`, `ls-opinion`, `ls-signpost`, `ls-answer-rules` (+ fix guides).
  **Challenge** `listening-foundation`.
- **Mino.** Listening tasks are judged facts and strategy first (like `ielts-basics`), and
  scripts the student writes are checked for the target feature and what a listener
  should write.
- **E2E.** `scripts/e2e/listening.e2e.ts`.

## Phase L: LEVEL 2 — Understanding IELTS Reading

- **Module** `reading-foundation` (`reading.ts` rd-1…rd-6, `reading-apply.ts`
  rd-7…rd-9), tag `reading`, concepts `rd-skim`, `rd-paraphrase`, `rd-tfng`,
  `rd-headings`, `rd-choice`, `rd-completion`. Short original passages. See
  `docs/READING_CURRICULUM.md`.
- **Patterns.** `rd-skim-scan`, `rd-paraphrase-match`, `rd-tfng-logic`, `rd-main-idea`,
  `rd-option-elimination`, `rd-word-limit` (+ fix guides). **Challenge** `reading-foundation`.
- **Mino.** Reading tasks are judged facts and strategy first (like `listening`), using
  only the passage in the task; labels, headings and paraphrases the student writes are
  checked against that passage.
- **E2E.** `scripts/e2e/reading.e2e.ts`.

## Phase M: LEVEL 2 — Understanding IELTS Writing

- **Module** `writing-foundation` (`writing.ts` wr-1…wr-6, `writing-apply.ts`
  wr-7…wr-9), new tag `writing`, concepts `wr-format`, `wr-task1`, `wr-data`, `wr-task2`,
  `wr-paragraph`, `wr-cohesion`. Task 1 tables use invented numbers. See
  `docs/WRITING_CURRICULUM.md`.
- **Patterns.** `wr-format-fact`, `wr-overview`, `wr-data-language`, `wr-task-response`,
  `wr-paragraph-unit`, `wr-cohesion-word` (+ fix guides). **Challenge** `writing-foundation`.
- **Mino.** Writing tasks are judged task first (using only the data or question in the
  task; every number checked against the table), then the language that matters for the
  target. Mino never gives a band score here; estimated bands stay in the Writing
  practice test.
- **E2E.** `scripts/e2e/writing.e2e.ts`.

## Phase N: LEVEL 2 — Understanding IELTS Speaking

- **Module** `speaking-foundation` (`speaking.ts` sp-1…sp-6, `speaking-apply.ts`
  sp-7…sp-9), new tag `speaking`, concepts `sp-format`, `sp-part1`, `sp-part2`, `sp-part3`,
  `sp-fluency`, `sp-pron`. Students write what they would say. See
  `docs/SPEAKING_CURRICULUM.md`.
- **Patterns.** `sp-format-fact`, `sp-extend`, `sp-long-turn`, `sp-discussion`,
  `sp-natural`, `sp-pronunciation` (+ fix guides). **Challenge** `speaking-foundation`.
- **Mino.** Speaking tasks are judged as spoken answers first (the exact question, the
  shape each part needs, natural spoken English), then grammar. Mino comments on
  pronunciation only through what the student wrote, never claims to have heard them, and
  never gives a band score here.
- **E2E.** `scripts/e2e/speaking.e2e.ts`.
- With this module every LEVEL 1 and LEVEL 2 module has lessons; no Foundation card shows
  "Soon" any more.

## Known issue: `pnpm lint`

`pnpm lint` runs `eslint .`, but the repository has never had an ESLint config
(`eslint.config.*` / `.eslintrc*`) and `eslint` is not a dependency, so `npx eslint`
installs the latest ESLint (v10) and stops with "couldn't find an eslint.config file".
This predates the Foundation work and is left as is (no config was invented). Until an
ESLint setup is chosen, the checks that gate a release are `npx tsc --noEmit -p .`, the
unit suites, the E2E specs and `next build`.

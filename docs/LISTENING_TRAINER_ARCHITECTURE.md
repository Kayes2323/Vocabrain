# Mino Listening Lab — Architecture (Phase 1)

A dedicated, 8-module IELTS Listening trainer that diagnoses a weakness, teaches it, gives guided
and independent practice, explains the exact mistake, and tracks mastery — not a mock-test site.
This document is the Phase 1 deliverable: architecture, content tree, UI/UX plan, component
architecture, data structures, audio asset management, the first production targets, and the
roadmap. **It does not claim any lesson, audio clip or exercise exists** — none do yet. What Phase 1
actually ships is the structure this document describes, wired into the real app (routes, dashboards,
the data model, the audio manifest and brief generator) — see §10 for the exact file list and §12 for
what is proven by test.

## 0. Audit: what already exists, and what this builds on

Before writing anything, the existing engine was read end to end. Two things changed the plan from
what the brief assumed:

1. **The "Writing Trainer" referenced in the brief is not a separate deep system.** Writing (and
   Listening, Reading, Speaking) each have a 9-lesson introductory module inside **IELTS Foundation**
   (`lib/foundation/`, see `docs/WRITING_CURRICULUM.md`, `docs/LISTENING_CURRICULUM.md`). Foundation
   *is* the app's one mature teaching engine (Course → Level → Module → Lesson → Step → Exercise,
   `hook → discover → concept → examples → ielts → mistakes → practice → recall → mastery`, spaced
   review, an error-tag system, Mino-judged writing). The Listening Lab is new, deliberately separate
   product real estate (its own hub, its own 8 modules, its own Error Notebook, Learning vs Exam
   Mode) — not a 10th Foundation lesson — because the brief asks for something at Foundation's own
   scale, specific to one skill. Phase 2's lesson engine should borrow Foundation's step/exercise
   shapes rather than invent new ones (§5).
2. **"Muse" is not needed as a new integration — the app already has a working audio pipeline.**
   `lib/ielts/listening-audio.ts` + `scripts/listening-audio.ts` already: cast real multi-provider TTS
   voices (Deepgram, Cartesia, Gradium, Azure) per speaker per test part, record raw lines, stitch them
   with `ffmpeg`, loudness-normalise across providers, insert reading/checking silence, and commit a
   manifest (`lib/ielts/content/vb-mock/listening-audio.json`) plus the final `.mp3`s to `public/`. It
   already produced real audio for 13 full mock tests. The Audio Asset Management system this
   document designs (§7) is built to feed batches into *that* pipeline, not to duplicate it — "Muse"
   in the brief's sense is whichever studio records a brief; this app already has one connected.

Also reused as-is, with no changes needed: the 13 IELTS question types and their answer modes
(`lib/ielts/question-types.ts`), the full objective-test engine (`ObjectivePart`/`QuestionGroup`/
`Question`, `lib/ielts/model.ts`), the test players (`ListeningPlayer`, `PracticeListeningPlayer`),
and the design system (`components/ds`, `docs/DESIGN_SYSTEM.md` — "Honest states": a planned feature
says so, never implied as built).

## 1. Product architecture

```
IELTS Hub (/ielts)
 └─ Listening Lab (/ielts/listening)                              ← NEW, this document
     ├─ 8 skill-area modules (/ielts/listening/module/<id>)
     │   1 Sound Recognition Lab        5 Part 4 Academic Lecture Lab
     │   2 Paraphrase & Vocabulary Lab  6 Accent & Speed Training
     │   3 Question Type Mastery        7 Spelling & Answer Accuracy Lab
     │   4 Part 3 Conversation Lab      8 Exam Simulation & Performance Lab
     ├─ 4 part dashboards (/ielts/listening/part/<1-4>)            ← a second view over the same
     │   Part 1 Everyday Conversation     8 modules, grouped by WHERE a skill is tested
     │   Part 2 Monologue
     │   Part 3 Academic Discussion  (+ a Part 3 Trap Library)
     │   Part 4 Academic Lecture
     ├─ Error Notebook (/ielts/listening/notebook)
     └─ Exam Simulation → reuses the existing Practice Tests engine (/ielts/tests), not rebuilt
```

A module (§2, the brief's "MODULE 01–08") and a part dashboard (§3) are two views of the *same* 46
skills: a skill lives once, in its module, and a part dashboard references it by
`${moduleId}:${skillId}` (`lib/listening-lab/parts.ts`). One skill can appear on more than one part's
dashboard (e.g. "Multiple Choice" matters in Parts 1, 2 and 3) without being defined twice. This is
the "shared data model" the brief's Phase 1 asks for.

## 2. The 8-module lesson tree

All 46 skills (the brief's "submodules") are written out, bilingually, in
`lib/listening-lab/modules.ts`. Summary:

| # | Module | Skills | Trains |
|---|---|---|---|
| 1 | Sound Recognition Lab | 15 | Connected speech, linking, weak forms, reduction, contractions, word boundaries, syllables, word/sentence stress, intonation, difficult vowels/consonants, numbers, similar-sounding words, fast speech |
| 2 | Paraphrase & Vocabulary Lab | 10 | Synonym/phrase/verb/noun/adjective/academic paraphrase, contextual meaning, meaning without keyword match, question-to-audio mapping, advanced (stacked) paraphrase |
| 3 | Question Type Mastery | 13 | One skill per IELTS Listening question type (multiple choice → diagram labelling), each tied to its real `QuestionType` |
| 4 | Part 3 Advanced Conversation Lab | 16 | Speaker identification/tracking, opinion recognition, agreement/disagreement/partial agreement, opinion changes, initial-idea-vs-final-decision, distractors, timing, reference tracking, MCQ strategy — plus the Trap Library (§3) |
| 5 | Part 4 Academic Lecture Lab | 15 | Lecture structure, signposting, academic vocabulary, note/sentence completion, word formation, spelling, terminology, number recognition, long-sentence processing, prediction |
| 6 | Accent & Speed Training | 5 | British/Australian/New Zealand/American English, and a speed progression (clear → realistic academic speed) |
| 7 | Spelling & Answer Accuracy Lab | 10 | The specific spelling/grammar/format mistakes that lose marks on an otherwise-correct answer |
| 8 | Exam Simulation & Performance Lab | 7 | Section practice, full simulation, prediction, transitions, concentration recovery, checking, personal analytics |

Every skill carries: a bilingual title and outcome (what the learner can do, not what it covers — the
brief's own framing), a `status` (currently `'planned'` for all 46, honestly), and, where relevant, the
real `QuestionType`(s) and IELTS part(s) it belongs to. `scripts/test-listening-lab.ts` asserts every
skill resolves correctly and that nothing claims a status it has not earned (§12).

## 3. Part-wise training structure

`lib/listening-lab/parts.ts` gives each of Parts 1–4 a dashboard: its real question types (from
`lib/ielts/question-types.ts`), the skills most relevant to it (by reference, §1), and its common
traps. Part 3 additionally gets a **Trap Library** (`PART3_TRAP_LIBRARY`): named, reusable trap
patterns (The Rejected Proposal, The Reluctant Agreement, The Partial Agreement, The Changed Mind, The
Third Option) that a lesson or exercise can cite by id, so the same trap is taught consistently
everywhere it appears, rather than re-described per lesson.

## 4. UI/UX screen plan

Ten screens, matching the brief's list, with what Phase 1 actually ships marked:

| # | Screen | Phase 1 |
|---|---|---|
| 1 | Listening Lab Home | **Shipped** — `/ielts/listening`: part dashboards, the 8 modules, Exam Simulation entry (linking to the real `/ielts/tests`), Error Notebook link |
| 2 | Part Selection | **Shipped** — the 4 cards on the Home screen |
| 3 | Module/Part Dashboard | **Shipped** — `/ielts/listening/module/<id>` and `/ielts/listening/part/<1-4>`: skills to master, question types, common traps, each skill's honest status |
| 4 | Lesson Overview | Phase 2 (needs a written lesson) |
| 5 | Audio Practice Screen | Phase 2–3 (reuses `ListeningPlayer`/`PracticeListeningPlayer`, extended for per-skill clips) |
| 6 | Question Interaction Screen | Phase 2–3 (reuses the existing `TestRunner`/`QuestionGroupView` renderers — already cover all 13 question types) |
| 7 | Feedback & Explanation Screen | Phase 2 (the error classifier, §6) |
| 8 | Error Notebook | **Shipped as an honest empty state** — `/ielts/listening/notebook`; wired to real data in Phase 2 |
| 9 | Progress Dashboard | Phase 2 (per-skill progress needs lessons to produce it) |
| 10 | Exam Simulation Screen | **Already exists** — the app's Practice Tests (`/ielts/tests`) already runs full, timed Listening sections exactly as the brief describes "Exam Mode" (no hints, no replay until submitted); Listening Lab points to it rather than rebuilding it |

Visual direction follows `docs/DESIGN_SYSTEM.md` exactly (existing tokens, `ModuleCard`/`ListRow`/
`StatusChip`/`Callout`/`Section`/`PageHeader`; no new colours, no new type scale, mobile-first,
one primary decision per screen). The one new visual element is the status chip mapping
(`components/listening-lab/StatusBadge.tsx`): planned → neutral, in-development → warning,
available → success — never upgraded without real content behind it.

## 5. Reusable component architecture

**New (Phase 1, generic across the whole Lab, not per-module):**
- `lib/listening-lab/{model,modules,parts,errors,audio-manifest}.ts` — the data layer (§1–§7).
- `components/listening-lab/useBilingual.ts` — picks `.en`/`.bn` from a `Bilingual` record for the
  active locale (same pattern as Foundation's `useFoundation()`'s `l()`).
- `components/listening-lab/StatusBadge.tsx` — the honest-status chip (§4).
- Four pages under `app/(app)/ielts/listening/` (home, module, part, notebook).

**Deliberately reused, not rebuilt:** `ObjectivePart`/`QuestionGroup`/`Question`, `ListeningPlayer`,
`PracticeListeningPlayer`, `TestRunner`, `ResultView`, the 13 question-type renderers, `ListeningVoice`/
`LISTENING_CAST`, the Practice Tests engine, and every `components/ds` primitive.

**Planned for Phase 2 (the teaching engine), designed now so Phase 1's data model does not need to
change under it:**
- A lesson player following Foundation's step loop (`hook → concept → demonstrate → practise →
  correct → reinforce → master`, matching the brief's cycle), parameterised per skill.
- An error classifier consuming `{ question, transcript, expectedAnswer, givenAnswer, responsePattern
  (timing, which distractor) }` → `ListeningErrorCode` — never the wrong option alone (the brief's own
  rule; `lib/listening-lab/errors.ts`'s `detectedFrom` field documents the evidence each code requires,
  and is what the classifier is built against).
- `ListeningMistake` records feeding a real Error Notebook and a spaced-revision queue (Foundation's
  `dueReviews` pattern is the direct precedent).

## 6. Error classification (brief §6)

Ten codes, `lib/listening-lab/errors.ts`: **DEC** (decoding/pronunciation), **PAR** (paraphrase missed),
**TRP** (distractor trap), **SPK** (speaker confusion), **TIM** (answered too early), **ATT**
(attention loss), **SPE** (spelling), **GRM** (grammar/word form), **MAP** (map/direction), **PRD**
(poor prediction). Each definition states exactly what evidence justifies it — e.g. **TRP** requires
"the chosen (wrong) option was explicitly mentioned in the audio and then corrected, rejected or
superseded", confirmed against the transcript, not assumed from the wrong pick alone. This is the
written contract Phase 2's classifier is built and tested against.

## 7. Audio Asset Management & the first production plan

**Architecture (`lib/listening-lab/audio-manifest.ts`):** an `AudioAsset` record carries every field the
brief asks for — asset id, module/skill/lesson/part, question types, difficulty, accent/locale, speaker
count and identities with voice instructions, the script (spoken text only) and verified transcript,
associated questions with answer key, paraphrase mapping and distractor/evidence locations, trap
categories, file path, duration, and **two separate status fields** (production status: brief-drafted
→ recording → stitched/needs-rerecord; QA status: not-started → transcript-verified/failed/passed).
`AUDIO_MANIFEST` starts **empty** — no asset is marked produced before it exists, by rule, and
`scripts/test-listening-lab.ts` asserts that.

`validateAsset()` checks the mechanical rules the brief sets for every asset before it is sent to
production: every speaker in the script is cast, no performance direction or speaker label is written
as spoken text (rule 8), every question's evidence line exists, a `stitched` asset has a file and a
duration. `renderProductionBrief(batchName, objective, assets)` turns a batch into a **self-contained
Markdown document** — accent, speaker voice instructions, a script/transcript table, the answer key
with paraphrase mapping and distractor explanations, trap categories, pronunciation notes, quality
requirements and the file-naming convention (`lab-<module>-<skill>-<nn>.mp3`) — exactly matching the
brief's §11 A–O list, usable by a human producer or by extending `scripts/listening-audio.ts` with no
further explanation needed.

**First production targets** (ready to brief once Phase 2 writes the first lessons, in this order,
matching the brief's priority):
1. **Part 3** — two- and three-speaker conversations: opinion changes, disagreement, partial
   agreement, distractors, matching opinions, paraphrasing, natural speed.
2. **Part 4** — academic monologues across the named subject spread (environment, technology, history,
   psychology, biology, geography, social sciences), with deliberately difficult spelling items.
3. **Part 2** — map/direction monologues, public-facility and town descriptions, MCQ monologues.
4. **Part 1** — registrations/reservations/personal-information dialogues (names, numbers, dates,
   addresses, spelled corrections).
5. A standalone **Sound Recognition Library** and **Paraphrase Library** — short, skill-isolated clips
   (not full test sections) for Modules 1–2, which existing full-test audio cannot provide because it
   is not segmented by sound/paraphrase pattern.

No content for any of these has been produced. No script has been written. This section is the plan
for Phase 2, not a claim about Phase 1.

## 8. Data model reference

```ts
// lib/listening-lab/model.ts
Bilingual            { en, bn }
Skill                { id, title, outcome, status, questionTypes?, parts?, lessonIds? }
Module               { id, number, title, purpose, status, skills: Skill[] }
ConversationTrap      { id, title, explanation, status }
PartDashboard         { part, title, questionTypes, skillRefs, commonTraps, status }
ErrorCodeDefinition   { code, name, detectedFrom, nextStep }
ListeningMistake      { id, at, moduleId, skillId, questionType?, errorCode, given, expected }
```
```ts
// lib/listening-lab/audio-manifest.ts
AudioAsset            { assetId, moduleId, skillId, lessonId?, part?, questionTypes, difficulty,
                         locale, speakers: AudioAssetSpeaker[], script: AudioAssetLine[], transcript,
                         questions: AssociatedQuestion[], trapCategories, filePath?, durationSeconds?,
                         productionStatus, qaStatus }
```
Reused without changes: `ObjectivePart`/`QuestionGroup`/`Question`/`ScriptLine`/`ListeningAudio`
(`lib/ielts/model.ts`), `QuestionType`/`QUESTION_TYPES` (`lib/ielts/question-types.ts`).

**Student progress** (`profile.listeningLab` on `UserProfile`) is deliberately **not added yet**. No
lesson exists to write to it, so adding the field now would be schema churn with nothing behind it —
a Firestore/profile change belongs with the engine that uses it (Phase 2), per the standing rule
against unnecessary changes. The shape it will take (per-skill status, mistakes by error code, days
practised) mirrors `FoundationProgress` (`lib/foundation/model.ts`) exactly, so adding it later is a
small, well-precedented change.

## 9. Security, data and content integrity notes

- No Firestore schema or Security Rules change in Phase 1 (nothing new is written per-student yet).
- No new dependency was added.
- No existing route, component or test was removed or behaviourally changed; `app/(app)/ielts/page.tsx`
  gained one new card, `lib/navigation.ts` one new entry, two locale files gained new keys plus one
  renamed group label (`ielts.groups.learn`: "IELTS Foundation" → "Learn", since that header now
  introduces two cards, not one — checked against every test and e2e reference to that key; none
  assert its exact text).
- All new IELTS-domain content follows `lib/ielts/validate.ts`'s existing rule: no Cambridge/publisher
  material, ever. Every example in this document and in the manifest schema is original.

## 10. Files added or changed (Phase 1)

**New:**
```
lib/listening-lab/{model,modules,parts,errors,audio-manifest,index}.ts
components/listening-lab/{useBilingual.ts,StatusBadge.tsx}
app/(app)/ielts/listening/page.tsx
app/(app)/ielts/listening/module/[moduleId]/page.tsx
app/(app)/ielts/listening/part/[part]/page.tsx
app/(app)/ielts/listening/notebook/page.tsx
scripts/test-listening-lab.ts
docs/LISTENING_TRAINER_ARCHITECTURE.md   (this document)
```
**Changed:** `lib/navigation.ts` (one new `IELTS_SECTIONS` entry), `app/(app)/ielts/page.tsx` (one new
card), `lib/i18n/locales/{en,bn}.ts` (new `listeningLab` namespace; `sections['listening-lab']`;
`ielts.cards['listening-lab']`; `ielts.groups.learn` relabelled), `package.json` (`test:listening-lab`).
**Untouched:** everything under `lib/ielts/`, `lib/foundation/`, Firestore rules, every other route.

## 11. Roadmap (unchanged from the brief, now with owners per file)

| Phase | Scope | Primary files |
|---|---|---|
| **1 — done** | Audit, information architecture, dashboards, module/part data model, audio manifest + brief generator | `lib/listening-lab/*`, the 4 pages, this document |
| 2 | Lesson engine (hook→concept→demonstrate→practise→correct→reinforce→master), audio player + question components reused from `lib/ielts`, the error classifier, Error Notebook wired to real data, `profile.listeningLab` | New `lib/listening-lab/{lesson-engine,progress}.ts`; extend the data model with `lessonIds` already reserved in `Skill` |
| 3 | Part 3, 4, 2, 1 training systems (real lessons + audio, in that priority) | Content files per module; audio batches via §7 |
| 4 | Sound Recognition, Paraphrase Lab, Accent & Speed, Spelling Lab content | Content files for Modules 1, 2, 6, 7 |
| 5 | Audio production at scale, asset validation in CI, progress tracking, adaptive recommendation (next-skill suggestion, mirroring `foundationJourney`/`nextAction`) | `scripts/listening-audio.ts` extended to read `AUDIO_MANIFEST`; a Phase-5 recommender |

## 12. What is proven, by test, right now

`pnpm test:listening-lab` (16 checks): module/skill/part structural integrity and uniqueness; every
status is honestly `'planned'`, never claimed further; all 10 error codes are complete and bilingual;
the audio manifest starts empty; `validateAsset` catches a cast mismatch, an out-of-range evidence
line, a stitched asset missing its file, and a performance direction written as spoken text;
`renderProductionBrief` produces every required section and handles an empty batch; the 4 new routes
exist as real files; the IELTS hub links to the Lab; every new i18n key exists in both languages.
Mutation-checked: forcing a module to `'available'` or duplicating a skill id each fail a real
assertion, confirming the checks are not vacuous. `pnpm run build` and `npx tsc --noEmit` both pass;
the full existing test suite (foundation, vocab-foundation, ielts, curriculum, mino-knowledge, journey,
abroad, study-abroad, pwa-install, my-plan, plan-schedule, ielts-progress, assess, study-options, kr)
passes unchanged. `pnpm test:study-plan` fails on a pre-existing, unrelated route-text mismatch present
on a clean `main` before this work (confirmed by stashing these changes and re-running); it is not
caused by, and was not fixed by, this task.

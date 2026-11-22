# Mino Listening — Architecture (Phase 1: six modules + Sound Gym integration)

This replaces the earlier, more generic "Listening Lab" (8 provisional modules, no real content)
with the brief's specific six-module design. The old structure was removed in the same commit —
it had zero lessons and was always marked "planned", so nothing real was lost.

## 0. Implementation plan and data architecture (written before coding, brief §14)

**Inspected first:** the existing IELTS engine (`ObjectivePart`/`QuestionGroup`, 13 question types,
`ListeningPlayer`), the Foundation lesson engine (`lib/foundation/`: Course→Level→Module→Lesson→Step,
the exact pattern this module's `Module`→`Lesson`→`Stage` mirrors), how `UserProfile` stores a
feature's progress (`profile.foundation`, inside the one `users/{uid}.app` document — no separate
collection, no rules change), and the just-merged **Mino Writing Studio** prototype
(`lib/writing-studio/`) as the most recent precedent for a similar "trainer" feature.

**One important correction from that inspection:** Writing Studio's progress numbers
(`lessonsDone: 1`, mock mistake categories) are explicitly mock data — its own code comment says so
("no network calls, no Firestore... mock data... for the prototype only"). That is the opposite of
this brief's own rule ("Progress is not fabricated," "Do not use temporary mock data as if it were
real learner data"). Mino Listening's progress engine was built against real `profile.listening`
data from the start, not copied from that pattern.

**Plan:** one shared data model (`lib/listening/model.ts`) for all six modules; a pure progress engine
(`lib/listening/progress.ts`) with no fabricated numbers; a central audio manifest matching the
brief's exact 36-file mapping; one audio player; one lesson-stage runner; four routes (dashboard,
module, lesson, practice library); `profile.listening` added to the existing profile schema (additive,
backward-compatible, no migration). Implemented in that order.

## 1. The three systems (brief §1)

- **Personal Trainer** — `/ielts/listening` (dashboard) + `/ielts/listening/lesson/[lessonId]`
  (guided stage sequence). Diagnoses via `weakSkills`/`topErrors`, recommends via `recommendedNext`/
  `continueLearning`, all reading `profile.listening`.
- **Practice Library** — `/ielts/listening/practice`: the same `LISTENING_MODULES` lessons and the
  same `profile.listening`, filtered by module/skill(type)/difficulty/completion, browsed independently
  of lesson order. No separate exercise records exist to fall out of sync.
- **Shared Progress & Performance Engine** — `lib/listening/progress.ts`, one set of pure functions
  both systems call.

## 2. The six modules (brief §2–§7)

| # | Module | Lessons in Phase 1 | Status |
|---|---|---|---|
| 1 | Sound Gym | 6 (SG-01..SG-06), full stage structure | `audio-pending` (structure real, audio not delivered) |
| 2 | Speech Decoder | 0 | `in-development` |
| 3 | Conversation Intelligence | 0 | `in-development` |
| 4 | Academic Mind | 0 | `in-development` |
| 5 | Accent World | 0 | `in-development` |
| 6 | IELTS Transfer Zone | 0 | `in-development` |

Modules 2–6 have their landing page, empty-lesson-slot handling ("Content in development"), and the
full `Module`/`Lesson`/`Stage` schema ready. Adding their first lesson is a data change to
`lib/listening/modules.ts` — no UI change, per brief §13.

## 3. Sound Gym: the six lessons and six stages (brief §2)

`lib/listening/modules.ts` builds SG-01..SG-06 from the exact brief text (code, title, skill). Every
lesson gets the same six stages, **in the given order, under the given names, never renamed**:
Diagnostic Listening → Understand the Skill → Guided Listening Lab → Context/Recognition Practice →
Independent Challenge → IELTS Transfer Test (`SOUND_GYM_STAGE_ORDER`, `STAGE_LABELS`).

**What is honestly NOT here:** the real script, transcript, questions, options, answer key,
explanations and distractor explanations for any Sound Gym stage. The brief says to use "the existing
content and scripts as the source of truth" from the attached ZIP's lesson reports — **no ZIP was
received in this conversation** (checked `/mnt/user-data/uploads` and the session's attachment
directory: both empty). Inventing that content would violate the brief's own rule ("Do not rewrite,
paraphrase, shorten, or invent questions"). Every stage is real and positioned correctly, with its
correct audio asset wired to it; its teaching content shows "Content in development" until the actual
package is supplied. **Please send the ZIP (lesson reports, master delivery report, and the 36 MP3
files) as a follow-up** — nothing else about Sound Gym needs to change to receive it (§7 below).

## 4. The central content manifest (brief §2)

`ManifestRow` (`lib/listening/model.ts`) is the join the brief asks for: module/lesson/stage id, audio
asset id/path, script reference, question ids, error tags, content status — always derived from
`Module`/`Lesson`/`Stage`/`AudioAsset`, never a second copy of the same facts.

## 5. Audio: the exact 36-asset mapping (brief §2)

`lib/listening/audio-manifest.ts` generates all 36 entries programmatically from the stage order, so
the mapping cannot drift from the brief by a typo. Example:

```
SG01, stage 1 (Diagnostic Listening)      -> SG01-A01 -> /audio/mino/listening/sound-gym/SG01/SG01-A01.mp3
SG01, stage 2 (Understand the Skill)      -> SG01-A02 -> /audio/mino/listening/sound-gym/SG01/SG01-A02.mp3
...
SG06, stage 6 (IELTS Transfer Test)       -> SG06-A06 -> /audio/mino/listening/sound-gym/SG06/SG06-A06.mp3
```

**No audio file was created.** `scripts/test-listening.ts` asserts none of the 36 paths exist on disk
in `public/`, by design — the brief explicitly forbids fake audio, and this is checked, not promised.

### How to add the real 36 files (once supplied)

1. Drop each file at exactly the path above, e.g. `public/audio/mino/listening/sound-gym/SG01/SG01-A01.mp3`.
   Asset ids and paths are already correct in the manifest; nothing in the manifest needs editing for
   the files themselves to start working — `AudioLessonPlayer` just starts succeeding instead of
   showing "Audio not available yet".
2. The brief's lesson reports should name each clip's speaker(s) and accent, and the master delivery
   report gives duration. Fill `AudioAsset.speakers` / `.durationSeconds` / `.scriptRef` in
   `lib/listening/audio-manifest.ts` from those reports — never guessed.
3. Write each stage's real `content` (`instructions`, `transcript`, `questions` with
   `distractorExplanation` and `errorTags`) in `lib/listening/modules.ts`'s lesson builder, and flip
   that stage's `contentStatus` to `'content-ready'` (or `'complete'` once audio + content are both
   in). No other file changes — `LessonStageRunner` already renders real content the moment it exists.
4. Re-run `pnpm test:listening`: the "ANTI-FABRICATION" check will now correctly report the file as
   present; update that one assertion's expectation for the assets that have truly landed (the test
   file says exactly this at the point of failure).

## 6. The shared lesson engine (brief §8)

`StageKind` names all six possible stages Sound Gym uses as one case of a more general set (Speech
Decoder etc. can use a different subset later, same mechanism). `LessonStageRunner`
(`components/listening/LessonStageRunner.tsx`) is the one UI that walks any lesson's stages — it reads
`Lesson`/`Stage`, never a specific module's file. Content and UI are separate: a content update in
`lib/listening/modules.ts` never requires touching the runner.

## 7. The shared progress & diagnostic engine (brief §9)

`lib/listening/progress.ts`, stored at `profile.listening` (new field on `UserProfile`, additive,
defaulted in `emptyProfile`, deep-merged in `withProfileDefaults` — exactly Foundation's own pattern,
no Firestore rules change needed since it lives inside the existing `users/{uid}.app` document).

- **Learner-level:** `lessonsCompletedCount`, `totalMinutesPracticed`, `progress.days`.
- **Skill-level:** `progress.skills[tag]` (attempts, correct, last practised); `weakSkills()` (≥3
  attempts, <70% accuracy).
- **Error-level:** `progress.errors[code]` (count, last seen); `topErrors()`.
- **Mastery levels**, fixed criteria, never a percentage (brief's own rule):

  | Level | Criterion |
  |---|---|
  | Foundation | Starting point for every learner |
  | Recognition | All 6 Sound Gym lessons completed |
  | Comprehension | Recognition + Speech Decoder completed |
  | Complex Listening | Comprehension + Conversation Intelligence AND Academic Mind completed |
  | IELTS Performance | Complex Listening + IELTS Transfer Zone completed |

  Levels above Recognition are **structurally unreachable right now** — their modules have no lessons
  yet — which is the correct, honest behaviour, not a bug.

The Sound Gym error tags are exactly the six given in the brief (`SEG-01` Boundary confusion, `CS-03`
Assimilation, `WF-01` Schwa, `SC-01` Vowel discrimination, `ND-01` Teen/ty confusion, `NS-04` Speaker
tracking), unmodified. `registerErrorTags()` is how a future module adds its own without touching
these.

## 8. Dashboard and Practice Library (brief §10–§11)

`/ielts/listening` answers all six dashboard questions directly from `useListening()` (a thin hook over
`useProfile()` + the pure engine — same wiring pattern as Foundation's `useFoundation()`). A first-time
learner with an empty `profile.listening` sees "Recommended next: SG-01 · Word Boundary Detective," not
an invented personalised insight.

`/ielts/listening/practice` filters by module, exercise type (stage kind), difficulty and completion,
reading the exact same `LISTENING_MODULES`/`profile.listening` — an accent filter is present in the UI
but disabled with an honest note, since no asset has delivered accent metadata yet (§5.2).

## 9. UI/UX (brief §12)

Follows `docs/DESIGN_SYSTEM.md` exactly: existing tokens and components only (`ModuleCard`, `ListRow`/
`RowGroup`, `StatusChip`, `Panel`, `Callout`, `Section`, `PageHeader`, `ProgressBar`). One new component,
`AudioLessonPlayer`, matches the brief's player requirements: play/pause, replay, 0.75–1.25× speed, a
seekable progress bar, explicit loading/error states (never a silent stall), and `onComplete`. Written
copy is English for this phase, matching the just-merged Writing Studio's own stated approach.

## 10. Files changed

**Removed** (superseded, zero real content, see top of this document): `lib/listening-lab/*`,
`components/listening-lab/*`, the old 4 routes under `app/(app)/ielts/listening/`,
`scripts/test-listening-lab.ts`, `docs/LISTENING_TRAINER_ARCHITECTURE.md`.

**New:**
```
lib/listening/{model,modules,error-tags,audio-manifest,progress,index}.ts
components/listening/{AudioLessonPlayer,LessonStageRunner}.tsx
components/listening/useListening.ts
app/(app)/ielts/listening/page.tsx
app/(app)/ielts/listening/module/[moduleId]/page.tsx
app/(app)/ielts/listening/lesson/[lessonId]/page.tsx
app/(app)/ielts/listening/practice/page.tsx
scripts/test-listening.ts
docs/LISTENING_ARCHITECTURE.md   (this document)
```
**Changed:** `lib/models/profile.ts` (+`listening: ListeningProgress`, +4 supporting interfaces, default
in `emptyProfile`), `lib/services/profile-repository.ts` (deep-merge `listening` in `withProfileDefaults`),
`lib/i18n/locales/{en,bn}.ts` (updated `sections['listening-lab']` / `ielts.cards['listening-lab']` copy;
removed the old `listeningLab` namespace), `package.json` (+`test:listening`).
**Untouched:** `lib/ielts/*`, `lib/foundation/*`, `lib/writing-studio/*`, Firestore rules, every other route.

## 11. Completed / incomplete / known issues (brief §15.12)

**Completed:**
- Six-module architecture, all six landing pages, navigation wiring.
- Sound Gym's full lesson/stage structure (6×6 = 36 stages), each wired to its correct, exactly-mapped
  audio asset path.
- Shared lesson-stage runner, shared audio player (full controls, honest loading/error states).
- Shared progress & diagnostic engine with fixed mastery criteria; `profile.listening` persisted.
- Personal Trainer dashboard and Practice Library, both reading the same records.
- Content schema designed for all six modules' future content.

**Incomplete / blocked, pending the ZIP:**
- Sound Gym's actual scripts, transcripts, questions, answer keys, explanations and distractor
  explanations — the brief names these as coming from the ZIP, which was not received.
- The 36 real MP3 files — `public/audio/mino/listening/sound-gym/...` is empty.
- Accent/speaker metadata per asset (depends on the delivery report).
- Acceptance tests that need the above: "all 36 audio assets map... every audio file loads and
  plays," "Sound Gym displays... the correct six learning stages" **with real content** — the
  structural half of each is done and tested; the content half is blocked.

**Known issues:**
- `LessonStageRunner`'s stage dots are clickable to jump to any stage (useful for review) — this is a
  deliberate choice, not a bug, but means a learner can skip ahead before Phase 2 adds any
  completion-gating logic a content package might require.
- Copy is English-only this phase (matches the Writing Studio precedent); Bangla page copy can follow
  later without a data-model change, since module/lesson content itself is already bilingual.

## 12. Acceptance tests status (brief §16)

| Test | Status |
|---|---|
| All six modules accessible through Listening navigation | ✅ `pnpm test:listening` |
| Sound Gym displays all six lessons | ✅ |
| Each Sound Gym lesson displays the correct six stages | ✅ |
| All 36 audio assets map to the correct lesson and stage | ✅ (mapping); ❌ playback — no files delivered |
| Every audio file loads and plays | ❌ blocked on the ZIP |
| Audio controls work on mobile and desktop | ✅ component built with touch-sized controls; not device-tested |
| Lesson completion is recorded correctly | ✅ `pnpm test:listening` (`recordStageVisit`/`isLessonComplete`) |
| Progress is not fabricated | ✅ (empty progress yields all zeros; tested) |
| Practice Library and Personal Trainer use the same content records | ✅ (same `LISTENING_MODULES` import, no duplication) |
| Error tags can be stored and linked to skills | ✅ |
| Empty modules clearly indicate content is in development | ✅ |
| Adding a new lesson does not require rewriting the lesson UI | ✅ by construction (`LessonStageRunner` takes any `Lesson`) |
| Existing application features continue to work | ✅ full regression suite + production build pass unchanged |

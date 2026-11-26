# Task 1 — Module 2 Audio: Mapping Report

15 clips delivered for `visual-information.ts` ("Understanding Visual Information", Module 2). Every clip was matched to its step **by content** — the clip's script (from `scripts.json`) was read and compared against that step's `trainerMessage`/`material`/`check` text — not by filename or array order, though in this delivery the two happen to agree.

| # | File | Duration (verified, ffprobe) | Step id | Step title | Confidence |
|---|---|---|---|---|---|
| 01 | task1-m2-01-intro.mp3 | 49.92 s | `intro` | Read Before You Write | High — content match (opens the lesson, "ধরুন IELTS exam-এ আপনি একটা chart পেলেন") |
| 02 | task1-m2-02-visual-anatomy.mp3 | 72.41 s | `visual-anatomy` | Understand the Parts of a Chart | High |
| 03 | task1-m2-03-units.mp3 | 87.72 s | `units` | What Exactly Is Being Measured? | High |
| 04 | task1-m2-04-time-categories.mp3 | 81.60 s | `time-categories` | What Is Being Compared? | High |
| 05 | task1-m2-05-legend.mp3 | 59.88 s | `legend` | Know Which Data Belongs to Which Group | High |
| 06 | task1-m2-06-trend-or-static.mp3 | 82.94 s | `trend-or-static` | Does This Visual Actually Show a Trend? | High — verified line-by-line against the step's `examples` block (same pie-chart/Company A illustration, same wording) |
| 07 | task1-m2-07-comparison.mp3 | 88.87 s | `comparison` | Identify the Direction and Relationship | High — verified line-by-line against the step's `text` paragraphs (same figures: 52%→38%, 6%→19%, 24%→21%, 11%→15%, 7% unchanged) |
| 08 | task1-m2-08-change-types.mp3 | 93.94 s | `change-types` | Two Different Ways to Describe Change | High |
| 09 | task1-m2-09-key-features.mp3 | 88.73 s | `key-features` | What Deserves Your Attention? | High |
| 10 | task1-m2-10-guided-analysis.mp3 | 75.07 s | `guided-analysis` | Read the Commuting Chart Step by Step | High — the chart-board step; clip narrates the step's `trainerMessage` plus the 6 `ChartBoardTask.prompt`s |
| 11 | task1-m2-11-misreading-clinic.mp3 | 33.96 s | `misreading-clinic` | Can You Spot the Misreading? (1 of 4) | High — verified: the README's quoted example sentence ("There were 52 car users in 2010.") is this step's exact `check.prompt` |
| 12 | task1-m2-12-misreading-clinic-2.mp3 | 31.66 s | `misreading-clinic-2` | Can You Spot the Misreading? (2 of 4) | High |
| 13 | task1-m2-13-misreading-clinic-3.mp3 | 30.00 s | `misreading-clinic-3` | Can You Spot the Misreading? (3 of 4) | High |
| 14 | task1-m2-14-misreading-clinic-4.mp3 | 35.21 s | `misreading-clinic-4` | Can You Spot the Misreading? (4 of 4) | High |
| 15 | task1-m2-15-independent-review.mp3 | 104.88 s | `independent-review` | Your Chart-Reading Checklist | High |

**Unused clips: none.** All 15 are mapped, one per step, covering every one of the lesson's 15 steps.

**What each clinic clip narrates (11–14):** the step's `trainerMessage` and the check's `prompt` only — never the MCQ options or the `explain` text, matching the production rule "do not reveal the answers... before the learner responds." The learner hears the scenario, then reads/answers the question, then reads the (silent, text-only) explanation after choosing.

**Scope note:** this package is Module 2 only (visual-information.ts). The other 6 Task 1 lessons have no narration yet — this integration adds the audio *system*, which will pick up any future lesson's clips automatically once they're added to `lib/writing-studio/audio-manifest.ts`, with no component changes needed.

**Tone note (flagging, not fixing):** the approved voice identity (`MINO-BN-VOICE-IDENTITY.md`) specifies "Always use আপনি, never তুমি" for all Mino Bangla audio. The on-screen Bangla lesson text (translated earlier) uses তুমি/তোমার throughout, per a different, separately-approved brief. The spoken narration and the written slide text therefore address the learner differently (আপনি vs তুমি). Scripts are verbatim-approved and I have not altered either side — this is a cross-brief inconsistency for the product owner to decide on, not something I resolved unilaterally.

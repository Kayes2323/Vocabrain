# MINO Sound Gym — Lesson SG-01: Word Boundary Detective — Production Report

Source: Master Audio Production Brief v1.0. Scripts reproduced verbatim; no
words added, removed, reordered or paraphrased. No asset titles, Production
notes, speaker labels or answer keys were spoken. Speaker labels in SG01-A06
were conveyed by voice only (Student = female, Administrator = male).

Output folder: `~/workspace/your_files/mino-sound-gym-master-brief-v1/SG01/`
Work files (chunks, build script, log): `SG01/_work/`

## Summary table

| Asset ID | File | Duration | Voices | Speed | Speech wpm | QA status | Issue |
|---|---|---|---|---|---|---|---|
| SG01-A01 | SG01-A01.mp3 | 67.61 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 88.4 | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A02 | SG01-A02.mp3 | 80.52 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 95.6 | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A03 | SG01-A03.mp3 | 116.14 s | Female British — Isabella (MINO-UK-VOICE-A) | 85 | 94.1 | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A04 | SG01-A04.mp3 | 78.02 s | Female British — Isabella (MINO-UK-VOICE-A) | 85 | 96.6 | REVIEW | Not aurally verified — needs Kayes to listen; "an aim / a name" and "ice cream / I scream" distinction must be checked by ear |
| SG01-A05 | SG01-A05.mp3 | 70.52 s | Male British — Magnus | 92 | 139.6 | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A06 | SG01-A06.mp3 | 45.94 s | Female British — Isabella (Student) + Male British — Magnus (Administrator) | 92 | 142.3 | REVIEW | Not aurally verified — needs Kayes to listen; "Room 214" was passed to TTS as digits, its spoken form (two-one-four vs two hundred and fourteen) needs a listening check |

Totals: 6 assets generated, 0 failed, 6 REVIEW, 0 PASS, 0 FAIL.
All 6 files confirmed by ffprobe (MP3, 24 kHz, mono). No TTS attempt failed.

## Per-asset detail

### SG01-A01 — Diagnostic Listening (Female, Isabella, speed 82)
- 13 chunks, 66 words, speech 44.81 s + gaps 22.80 s = 67.61 s total.
- Structure: 3 intro sentences, 4 phrases ("One: an apple." … "Four: a new
  student."), "Listen again and write down the words you hear.", the 4 phrases
  repeated once, closing sentence. All script sentences present, in order.
- Pauses: 3.0 s inserted between phrases (both passes). Silence detection on
  the finished file found 6 gaps of ~3.7 s (3.0 s inserted + ~0.7 s natural
  chunk padding). 0.8 s gaps elsewhere.

### SG01-A02 — Understanding Word Boundaries (Female, Isabella, speed 82)
- 13 chunks, 113 words, speech 70.92 s + gaps 9.60 s = 80.52 s total.
- All script sentences present, in order. The quoted examples were spoken as
  plain phrases ("an apple", "an aim", "a name") — quote marks are punctuation,
  not spoken words. The lines "For example: 'an aim' and 'a name'." were
  synthesised as one chunk; words and order unchanged.
- Pauses: 0.8 s between sentences (no pause specified in the brief). No
  silence ≥2 s detected, as expected.

### SG01-A03 — Guided Listening Lab (Female, Isabella, speed 85)
- 14 chunks, 100 words, speech 63.74 s + gaps 52.40 s = 116.14 s total.
- Structure: 2 intro sentences, 5 sentences with "Sentence one:" … "Sentence
  five:" labels, all 5 repeated once with labels, 2 closing sentences.
  All script sentences present, in order.
- Pauses: 5.0 s after each of the 5 sentences in both passes. Silence
  detection found 10 gaps of ~5.7–5.9 s (5.0 s inserted + chunk padding).

### SG01-A04 — Context Detective (Female, Isabella, speed 85)
- 15 chunks, 87 words, speech 54.02 s + gaps 24.00 s = 78.02 s total.
- Structure: intro, Example one (Context A / Context B, target phrases
  "An aim." / "A name."), Example two (Context A / Context B, target phrases
  "Ice cream." / "I scream."), 2 closing sentences. "Context A:" / "Context B:"
  labels were spoken, so the learner can tell the two contexts apart.
  All script sentences present, in order.
- Pauses: 4.0 s before each of the 4 target phrases. Silence detection found
  4 gaps of ~4.7–4.8 s (4.0 s inserted + chunk padding).

### SG01-A05 — Independent Challenge (Male, Magnus, speed 92)
- 14 chunks, 91 words, speech 39.12 s + gaps 31.40 s = 70.52 s total.
- Interpretation decision (brief says "Play each sentence twice"): each
  numbered sentence was played twice consecutively — "One: …" then the same
  sentence again without the number — followed by a 5 s pause before the next
  item. The closing sentences ("You will hear each sentence twice." / "Do not
  look at the transcript…") were spoken at the end, in script order. If Kayes
  wanted a full second pass of all five instead, say so and it will be rebuilt.
- Pauses: 5.0 s after each sentence's second play. Silence detection found
  5 gaps of ~5.5 s (5.0 s inserted + chunk padding).

### SG01-A06 — IELTS Transfer (Female Student Isabella + Male Administrator Magnus, speed 92)
- 11 turns, 90 words, speech 37.94 s + gaps 8.00 s = 45.94 s total.
- All 11 dialogue turns present, in order, voices alternating correctly, no
  overlap. Speaker labels were NOT spoken.
- Pauses: ~0.8 s between turns (natural dialogue). No silence ≥2 s, as expected.
- Note: "Room 214" was passed to TTS exactly as written (digits). Its spoken
  rendering needs a listening check (see table).

## Speech-speed note (read before judging the wpm column)
Speech wpm = total script words ÷ summed chunk durations. Chunk durations
include each TTS chunk's own leading/trailing silence (about 0.5–1.5 s per
chunk, noticeably more on the Isabella voice than on Magnus), so the figure
understates the actual articulation rate — most strongly for A01–A04, which
have many short chunks at speeds 82–85. A05/A06 at speed 92 measure 139.6 /
142.3 wpm on the same basis. The speed settings follow the parent task
(diagnostic/teaching 82, guided 85, independent/IELTS 92); no asset was
re-rendered for speed. If Kayes wants a faster/slower feel for A01–A04, the
speed setting — not the script — is the lever.

## Verification performed
- ffprobe on all 6 files: MP3, 24,000 Hz, mono, durations match
  speech + inserted gaps exactly (see build-report.json).
- ffmpeg silencedetect (−40 dB, ≥2 s) on all 6 files: A01 6 gaps, A03 10 gaps,
  A04 4 gaps, A05 5 gaps — all matching the specified pauses; A02/A06 none,
  as expected (0.8 s gaps only).
- Script completeness: every script sentence/turn is a synthesised chunk in
  the build script (`_work/build_sg01.py`); nothing else was sent to TTS.
- NOT verified: aural listening. Nobody on this VM can hear audio, so no
  asset is marked PASS. In particular the "an aim / a name" and
  "ice cream / I scream" contrasts (A02, A04), weak-form naturalness, and the
  "Room 214" reading (A06) need Kayes to listen.

## Failed attempts
None. All 84 TTS chunk calls succeeded on the first attempt; all 6 files
stitched and verified in one build run.

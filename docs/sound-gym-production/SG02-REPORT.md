# MINO Sound Gym — Lesson SG-02 Connected Speech Decoder — Production Report

Source: Master Audio Production Brief v1.0. Scripts reproduced VERBATIM.
No titles, Production instructions, speaker labels or answer keys were spoken.
No words added, removed, reordered or paraphrased.

## Voice cast
- Female British (all female parts, incl. Student in A06): Isabella — `avocado_v2:isabella` (MINO-UK-VOICE-A)
- Male British (A05, Administrator in A06): Magnus — `avocado_v2:magnus`
- Speeds: diagnostic/teaching 82 (A01–A04), independent 92 (A05), IELTS transfer 92 (A06)
- Format: MP3, 24 kHz mono, 64 kbps. One file per asset, no merging.

## Results

| Asset ID | Duration | Voices | Speech wpm* | QA status | Issue |
|---|---|---|---|---|---|
| SG02-A01 | 96.94 s | Female British (Isabella) | 101.5 | REVIEW | Linking audibility not aurally verified on this VM — Kayes to listen. Repeat of the 5 sentences placed between the sentences and the closing "Listen twice…" lines (closing spoken once). 4 s pauses confirmed by silence detection (~4.8 s incl. chunk padding). |
| SG02-A02 | 95.03 s | Female British (Isabella) | 100.2 | REVIEW | IPA not vocalised: "/j/ or /w/" spoken as "y or w". Glide linking audibility needs human listening. 3 s example gaps confirmed (~3.7–3.8 s incl. padding). |
| SG02-A03 | 77.71 s | Female British (Isabella) | 102.2 | REVIEW | IPA not vocalised: "/n/→/m/", "/b/", "/p/", "/d/ and /j/→/dʒ/" spoken as letter names ("n", "m", "b", "p", "d and y … like j"). Whether /n/→/m/ assimilation and /d/+/j/ coalescence are actually audible needs human listening. |
| SG02-A04 | 70.06 s | Female British (Isabella) | 98.6 | REVIEW | Each phrase ("next day", "last night", "must be") spoken twice: careful at speed 75, connected at speed 85. Whether the /t/ omission is audible in the connected version could NOT be verified by ear on this VM — Kayes to listen. "/t/ or /d/" spoken as "t or d". |
| SG02-A05 | 100.50 s | Male British (Magnus) | 130.3 | REVIEW | LIMITATION: each phrase played twice (2 s between plays, 5 s between items — both confirmed by silence detection: ~2.5 s and ~5.5 s incl. padding). Item 5 ("We met them the next day") and item 6 ("I must be careful") were spoken naturally, but I cannot confirm by ear whether the /t/ elision is reliably audible in the TTS output — Kayes must listen; if it is not audible, this asset needs a re-record, not a script change. No answers spoken. |
| SG02-A06 | 45.37 s | Female British (Isabella) + Male British (Magnus) | 150.9 | REVIEW | No defect found in script/format/pause checks; date (23 September) and times preserved exactly, speaker labels not spoken. REVIEW only because conversational naturalness could not be aurally verified on this VM. |

\* Speech wpm is computed from per-chunk file durations, which include the TTS engine's
leading/trailing silence on every chunk — short items (e.g. "an apple", "One: …") therefore
read slower than the in-sentence speaking pace. A01–A04 at speed 82 measure ~99–102 wpm on
this basis; the same speed measured 142.7 wpm on 8 full sentences in Audio 001, so the
in-sentence pace is materially faster than the table figure suggests.

## Verification performed (all 6 assets)
- ffprobe: every file exists, MP3, 24 kHz, mono; durations match the stitched
  expectation (speech + inserted gaps) to the second: A01 96.94, A02 95.03,
  A03 77.71, A04 70.06, A05 100.50, A06 45.37.
- ffmpeg silencedetect (-40 dB, min 1.5 s): A01 nine ~4.8 s gaps; A02 ~3.8 s
  example gaps; A03/A04 ~1.5–1.7 s gaps (0.8 s inserted + padding);
  A05 five ~5.5 s gaps and six ~2.5 s gaps; A06 0.8 s turn gaps (mostly just
  under the 1.5 s detection threshold, 2 detected at ~1.5–1.6 s).
- Script completeness: every chunk was synthesised from its exact script text;
  chunk inventory per asset — A01 13, A02 17, A03 13, A04 14, A05 20, A06 11
  (89 chunks total). No extra spoken text.
- TTS failures: none. 0 failed attempts.

## Totals
- Generated: 6 / 6
- PASS: 0
- REVIEW: 6 (all awaiting human listening — no aural verification possible on this VM)
- FAIL: 0
- Could not be generated: none

## Files
- `SG02-A01.mp3` … `SG02-A06.mp3` in this folder (`SG02/`)
- Build script + chunk work files: `SG02/_work/build_sg02.py`, `SG02/_work/build-report.json`

# Task 1 — Module 2 Audio Package (Clips 01–15)

Everything Claude needs to integrate the Module 2 narration into the Vocabrain app, in one package.

## Contents

- `audio/` — the 15 MP3 clips, in order (total ~17 min)
- `TASK1-M2-MANIFEST.md` — durations, peaks, pause verification, QC report
- `task1-m2-timestamps.json` — word-level timestamps for all 15 clips (ASR-derived timings; word text is ASR-rendered, use `scripts.json` for exact wording)
- `scripts.json` — the verbatim approved narration scripts, paragraph by paragraph, in the exact order spoken
- `MINO-BN-VOICE-IDENTITY.md` — the approved voice identity and production rules for any future clips

## Clip order

| # | File | Title | Duration |
|---|---|---|---|
| 01 | task1-m2-01-intro.mp3 | Intro | 49.89 s |
| 02 | task1-m2-02-visual-anatomy.mp3 | Visual Anatomy | 72.36 s |
| 03 | task1-m2-03-units.mp3 | Units | 87.69 s |
| 04 | task1-m2-04-time-categories.mp3 | Time and Categories | 81.57 s |
| 05 | task1-m2-05-legend.mp3 | Legend | 59.84 s |
| 06 | task1-m2-06-trend-or-static.mp3 | Trend or Static | 82.91 s |
| 07 | task1-m2-07-comparison.mp3 | Comparison | 88.83 s |
| 08 | task1-m2-08-change-types.mp3 | Two Types of Change | 93.90 s |
| 09 | task1-m2-09-key-features.mp3 | Key Features | 88.70 s |
| 10 | task1-m2-10-guided-analysis.mp3 | Guided Chart Analysis | 75.04 s |
| 11 | task1-m2-11-misreading-clinic.mp3 | Misreading Clinic 1 | 33.93 s |
| 12 | task1-m2-12-misreading-clinic-2.mp3 | Misreading Clinic 2 | 31.62 s |
| 13 | task1-m2-13-misreading-clinic-3.mp3 | Misreading Clinic 3 | 29.97 s |
| 14 | task1-m2-14-misreading-clinic-4.mp3 | Misreading Clinic 4 | 35.17 s |
| 15 | task1-m2-15-independent-review.mp3 | Independent Review | 104.84 s |

## Rules for Claude (do not break these)

- Voice is **Sarah A v2** (ElevenLabs Sarah, `EXAVITQu4vr4xnSDxMaL`, eleven_v3, stability 0.4, similarity 0.75, speed 1.0, −16 LUFS). Use this voice and these settings for any future Module 2 / MINO Bangla audio.
- **IELTS is pronounced আইএলটস — one smooth word.** Never spell it out letter by letter (আইইএলটিএস). If it cannot be pronounced beautifully and professionally, avoid saying it rather than pronouncing it badly.
- Scripts are verbatim — do not rewrite, summarise or improvise them. Do not reveal the answers in the Misreading Clinics (clips 11–14) before the learner responds.
- English loanwords are written in Bangla script for Bangla pronunciation (see `MINO-BN-VOICE-IDENTITY.md`); the 3 English example sentences stay in English.
- Audio is MP3 128 kbps, 44.1 kHz, with 0.8 s silence between paragraphs. Do not re-encode or trim unless the owner asks.
- No music, no effects, no other voice. Do not substitute another voice for any reason.

## How the audio was made

Paragraph-by-paragraph synthesis with Sarah A v2, joined with exact 0.8 s silence beds, loudness-normalised to −16 LUFS. Every clip was verified: duration, segment count, peaks (no clipping), paragraph gaps, and a full transcription check against the source scripts.

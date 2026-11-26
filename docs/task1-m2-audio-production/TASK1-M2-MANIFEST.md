# Task 1 — Module 2: Understanding Visual Information — Audio Manifest & QC Report

Voice: **Sarah A v2** — ElevenLabs Sarah (`EXAVITQu4vr4xnSDxMaL`), model eleven_v3,
stability 0.4, similarity 0.75, speed 1.0, loudness −16 LUFS, MP3 128 kbps.
Scripts: supplied verbatim by the owner, 2026-11-26. Nothing rewritten, no answers
revealed in the Misreading Clinics (clips 11–14), no filenames/clip numbers read aloud.

Status: **ALL 15 CLIPS DELIVERED 2026-11-26** — total 1016.26 s ≈ 16 min 56 s.

## Delivered — 15 of 15 clips

| Clip | File | Duration | Paragraphs | Peak | Mean |
|---|---|---|---|---|---|
| 01 Intro | task1-m2-01-intro.mp3 | 49.89 s | 9 | −5.8 dB | −20.1 dB |
| 02 Visual Anatomy | task1-m2-02-visual-anatomy.mp3 | 72.36 s | 11 | −5.3 dB | −19.9 dB |
| 03 Units | task1-m2-03-units.mp3 | 87.69 s | 18 | −5.0 dB | −19.8 dB |
| 04 Time and Categories | task1-m2-04-time-categories.mp3 | 81.57 s | 12 | −4.8 dB | −19.7 dB |
| 05 Legend | task1-m2-05-legend.mp3 | 59.84 s | 10 | −5.0 dB | −19.8 dB |
| 06 Trend or Static | task1-m2-06-trend-or-static.mp3 | 82.91 s | 13 | −3.4 dB | −19.4 dB |
| 07 Comparison | task1-m2-07-comparison.mp3 | 88.83 s | 17 | −4.8 dB | −19.9 dB |
| 08 Two Types of Change | task1-m2-08-change-types.mp3 | 93.90 s | 18 | −4.8 dB | −19.8 dB |
| 09 Key Features | task1-m2-09-key-features.mp3 | 88.70 s | 16 | −5.2 dB | −19.9 dB |
| 10 Guided Chart Analysis | task1-m2-10-guided-analysis.mp3 | 75.04 s | 15 | −4.8 dB | −19.8 dB |
| 11 Misreading Clinic 1 | task1-m2-11-misreading-clinic.mp3 | 33.93 s | 10 | −4.8 dB | −19.8 dB |
| 12 Misreading Clinic 2 | task1-m2-12-misreading-clinic-2.mp3 | 31.62 s | 7 | −4.9 dB | −20.2 dB |
| 13 Misreading Clinic 3 | task1-m2-13-misreading-clinic-3.mp3 | 29.97 s | 6 | −5.7 dB | −20.1 dB |
| 14 Misreading Clinic 4 | task1-m2-14-misreading-clinic-4.mp3 | 35.17 s | 7 | −5.0 dB | −20.0 dB |
| 15 Independent Review | task1-m2-15-independent-review.mp3 | 104.84 s | 25 | −5.3 dB | −20.1 dB |

## How they were made

- Each clip generated paragraph by paragraph, then joined with exact **0.8 s**
  silence between paragraphs (verified: every bed measures 0.80 s).
- English loanwords rendered in Bangla script for Bangla pronunciation, per the
  approved voice identity (e.g. chart → চার্ট, Task 1 → টাস্ক ওয়ান,
  percentage points → পার্সেন্টেজ পয়েন্টস). Full substitution list is in
  `task1-m2/prep.py`.
- **IELTS is pronounced আইএলটস — one smooth word**, never spelled out
  letter by letter. The first version of clip 01 said আইইএলটিএস (Whisper heard
  "I-I-L-T-S"); the owner flagged it, and clip 01 segments 2 and 5 plus clip 08
  segment 1 were re-generated with আইএলটস. Verified: the new clip 01 transcript
  reads "IELT's" as one word.
- The 3 English example sentences were kept in English and generated with
  language code `en`: "Car use accounted for 52% of commuters in 2010.",
  "There were 52 car users in 2010.", "Accurate data attribution is just as
  important as accurate numbers."
- Clips 04 and 15 each have one extra natural ~0.6–0.8 s pause inside a paragraph
  (the model's own pause right before a 0.8 s bed). All beds are present; nothing
  is missing.

## Verification (all 15 clips)

- Peaks −3.4 to −5.8 dB — no clipping. Means −19.4 to −20.2 dB.
- Segment audit: every paragraph present, in order (segment files counted
  against the source).
- Transcription check (faster-whisper, word-level): transcripts track the source
  paragraph by paragraph; both English quotes in clip 03 and the English sentence
  in clip 05 are present and correctly worded; all figures in clips 07–08
  (52→38, 6→19, 24→21, 11→15, 7 unchanged; 13 percentage points, ~217% relative
  growth) are present; no repeated-word hallucinations in any clip.
- Caveat: Whisper renders Bangla words in Urdu/Latin script, so the word text in
  `task1-m2-timestamps.json` is ASR-rendered, not source text — the **timings**
  are real and usable; use the supplied scripts for exact wording.

## Account note

Clips 01–07 were made on the first ElevenLabs Free account, whose 10,000-char
quota ran out during clip 08. The owner connected a second ElevenLabs account
(fresh Free, 10,000 chars); clips 08–15 and the three re-generated IELTS
segments were made on it. No alternative voice was ever substituted.

## Files

- Audio: `~/workspace/your_files/task1-m2-*.mp3`
- Word timestamps (15 clips): `~/workspace/your_files/task1-m2-timestamps.json`
- Working files: `~/workspace/mino-listening-batch01/task1-m2/`
  (`scripts-part1/2/3.json` verbatim source, `tts_texts.json`, `prep.py`,
  `generate_task1.py`, `assemble_task1.py`, `manifest.json`,
  `timestamps-01..15.json`, `progress.json`, `segments/`)

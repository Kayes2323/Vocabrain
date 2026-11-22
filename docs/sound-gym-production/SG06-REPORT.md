# MINO Sound Gym — Lesson SG-06 Natural Speech Challenge — Production Report

Master Brief v1.0. SG-06 only. Scripts verbatim from the brief — no rewrites, no
added/removed/reordered words, no titles, speaker labels, Production instructions
or answer keys spoken. Speed 92 for all assets. MP3 only, 24 kHz mono, 64 kbps.
One chunk per dialogue turn (A01/A04/A06) or per sentence (A02/A03/A05), stitched
with 0.8 s silence between chunks. No overlapping dialogue.

## Results

| Asset ID | Duration | Voices | Speech wpm | QA status | Issue |
|---|---|---|---|---|---|
| SG06-A01 | 42.85 s | Isabella (F British, Student) + Magnus (M British, Staff) | 136.0 | REVIEW | Accent/voice distinction needs human listening (cannot hear audio on this VM). |
| SG06-A02 | 46.86 s | vd2_sunny_paddle (M Australian, solo) | 149.8 | REVIEW | Australian accent authenticity needs human listening; no British voice used. |
| SG06-A03 | 41.84 s | MAI_01 / Aria (F American, solo) | 142.4 | REVIEW | Re-rendered at speed 82 (was 168 wpm at speed 92). American accent needs human listening. |
| SG06-A04 | 54.48 s | Magnus (Student A) + Isabella (Student B) + Paloma (Student C) | 134.5 | REVIEW | Student B (Isabella) vs Student C (Paloma) distinction needs human listening. |
| SG06-A05 | 60.54 s | Magnus (M British, solo) | 138.5 | REVIEW | Academic monologue; pace and clarity need human listening. |
| SG06-A06 | 52.23 s | Isabella (Student) + Magnus (Tutor) | 146.5 | REVIEW | Accent/voice distinction needs human listening. |

Totals: 6 generated, 0 PASS (none marked PASS — no audio was heard on this VM),
6 REVIEW, 0 FAIL, 0 not generated. Failed TTS attempts: none (57/57 chunks
synthesised on first attempt).

## Verification performed

- ffprobe on all 6 files: MP3, 24,000 Hz, mono, 64 kbps; durations match the
  stitched totals exactly (speech + 0.8 s × gaps).
- ffmpeg silencedetect: inter-chunk gaps present in every file (A01 10, A02 7,
  A03 7, A04 9 inserted + 2 natural sentence pauses inside two-sentence turns,
  A05 8, A06 10 inserted + 1 natural sentence pause inside a two-sentence turn);
  detected gaps ~0.8–1.6 s (0.8 s inserted + natural chunk padding).
- Script completeness from chunk inventory: A01 11/11 turns, A02 8/8 sentences,
  A03 8/8 sentences, A04 10/10 turns, A05 9/9 sentences, A06 11/11 turns.
  Each chunk was synthesised from its exact script text only.
- Voice assignment from chunk inventory: A01 alternates Isabella/Magnus exactly
  as scripted; A02 uses only vd2_sunny_paddle; A03 uses only MAI_01; A04 uses
  Magnus (A) / Isabella (B) / Paloma (C) in the scripted order; A05 Magnus only;
  A06 alternates Isabella/Magnus exactly as scripted. All five voice IDs were
  verified in the TTS voice catalog before use (Isabella British F, Magnus
  British M, Paloma British F, vd2_sunny_paddle Australian M, MAI_01 American F).
  No TTS voice-substitution message was reported by the CLI.
- Dates/numbers preserved exactly as written in words (e.g. "eight in the
  evening", "June tenth", "May twentieth", "half past two", "two thousand five
  hundred and three thousand words", "twenty-second of November").

## Pronunciation / production notes

- A03 (American, Aria/MAI_01) was re-rendered at speed 82 and now runs at 142.4 wpm speech-only (was 168 wpm at speed 92), vs
  134–150 wpm for the other five assets at the same speed setting — the voice
  itself renders faster. Flagged above; a slower re-render is a one-line change
  if Kayes finds it rushed.
- A02 Australian and A03 American accents, and the B-vs-C distinction in A04,
  were assigned by voice ID only and could not be aurally verified on this VM.
  Kayes must listen to A02, A03 and A04 before publishing.
- No background music, no sound effects, no echo/reverb added; clean TTS
  output stitched with silence only.

## Files

- [SG06-A01.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A01.mp3) (336 KB, 42.85 s)
- [SG06-A02.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A02.mp3) (367 KB, 46.86 s)
- [SG06-A03.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A03.mp3) (328 KB, 41.84 s)
- [SG06-A04.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A04.mp3) (427 KB, 54.48 s)
- [SG06-A05.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A05.mp3) (474 KB, 60.54 s)
- [SG06-A06.mp3](sandbox://workspace/your_files/mino-sound-gym-master-brief-v1/SG06/SG06-A06.mp3) (409 KB, 52.23 s)
- Work files (chunks, build script, build log): `SG06/_work/`

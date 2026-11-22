# Mino Sound Gym — Lesson SG-05: Numbers, Names & Spelling
## Delivery Report (Master Audio Production Brief v1.0)

All six scripts taken VERBATIM from the Master Brief. No words rewritten, added, removed or reordered. No asset titles, production instructions, speaker labels or answer keys spoken.

## Voices
- Female British — Isabella, `avocado_v2:isabella` (MINO-UK-VOICE-A): all female parts, incl. Student in SG05-A06
- Male British — Magnus, `avocado_v2:magnus`: SG05-A05 (whole asset) and Administrator in SG05-A06
- Speeds: A01 82 (diagnostic), A02 82 (teaching), A03 85 (guided), A04 85 (guided), A05 92 (independent), A06 92 (IELTS transfer)

## Results

| Asset ID | Duration | Voices | Speech wpm* | QA status | Issue |
|---|---|---|---|---|---|
| SG05-A01 | 75.44 s | Female British (Isabella) | 57.8 | REVIEW | Teen/ty stress distinction (thirteen/thirty etc.) not aurally verified — Kayes must listen. |
| SG05-A02 | 136.89 s | Female British (Isabella) | 63.2 | REVIEW | Teen/ty stress distinction is the whole point of the asset — needs a listening check. |
| SG05-A03 | 59.68 s | Female British (Isabella) | 108.5 | REVIEW | Dates/times/prices not aurally verified on this VM — Kayes must listen. |
| SG05-A04 | 69.45 s | Female British (Isabella) | 97.0 | REVIEW | Spelling clarity (letters distinct) not aurally verified — Kayes must listen. |
| SG05-A05 | 147.50 s | Male British (Magnus) | 130.7 | REVIEW | Corrections + spelling clarity not aurally verified — Kayes must listen. |
| SG05-A06 | 60.11 s | Female Isabella + Male Magnus | 128.6 | REVIEW | Dialogue naturalness and number accuracy not aurally verified — Kayes must listen. |

\* Speech wpm = spoken words ÷ summed chunk durations. Chunk durations include per-chunk TTS leading/trailing padding, so wpm is understated for assets with many very short chunks (A01, A02: mostly 1–2-word chunks). True articulation rate is higher. A05/A06 (longer chunks) read ~129–131 wpm.

**No asset is marked PASS**: everything checkable without ears was checked (see below), but no audio on this VM can be heard, so final aural verification rests with Kayes.

## Verification done
- ffprobe on all 6 files: MP3, 24 kHz, mono, durations match the build exactly (75.44 / 136.89 / 59.68 / 69.45 / 147.50 / 60.11 s).
- ffmpeg silencedetect: pauses confirmed in every file (A01 16 gaps ≥1.5 s; A02 26 gaps ≥1.5 s incl. the 3 s number gaps; A05 29 silence segments at 0.5 s threshold, ~1.2–1.4 s each = 0.8 s inserted gap + chunk padding).
- Script completeness: every chunk was synthesised from the verbatim script text; chunk counts A01 20, A02 30, A03 12, A04 12, A05 27, A06 12.
- Numbers/dates/prices: all preserved as words — 21 Oct, quarter past nine, £315, 1 h 20 min, 2.5 kg, 14 Oct, 6 weeks, £315 + £50 discount, 6:15–7:45, ref 4827, room 214, 15/16 June, 15/16 Nov, tel. 0794/0795 231 684, fee £345.50.
- Corrections preserved (never dropped): A04 "fifteenth of June. Sorry, I mean the sixteenth of June" and "forty-five pounds. Actually, it's forty-five pounds and fifty pence"; A05 "Sorry, that's zero seven nine five..." and "No, apologies, the sixteenth of November" — both in BOTH passes.
- Spelling: surnames sent to TTS as spaced letters ("W I L S O N", "W I L K I N S O N") so each letter is pronounced distinctly. This is a production choice, not a script change — the spoken letters are exactly the brief's letters.

## Production choices (where the brief left the repeat structure open)
- A01 "Listen twice": numbers spoken once, then the cue "Listen twice. Write each number in digits. Pay attention..." then the 8 numbers repeated once.
- A02: full teaching script first, then the production sequence (sixteen, sixty, fourteen, forty, nineteen, ninety, fifteen, fifty) with 3 s gaps, repeated once.
- A03 "Repeat each statement once": intro + 5 statements, then "Listen again..." cue, then the 5 statements repeated once.
- A05 "Listen twice": intro once, then the exact audio script (items One–Eight) spoken twice in full.
- Default gap where the brief gives none: 0.8 s between sentences/turns.

## Failures
- None. All 113 TTS chunks synthesised on first attempt; no failed or retried chunk. (The build command's exit code 1 came only from `tee` failing to open the log file before the script created its work folder — it did not affect any audio.)

## Files
- `SG05-A01.mp3` (591 KB) · `SG05-A02.mp3` (1.1 MB) · `SG05-A03.mp3` (467 KB)
- `SG05-A04.mp3` (544 KB) · `SG05-A05.mp3` (1.2 MB) · `SG05-A06.mp3` (471 KB)
- Build script: `SG05/_work/` (chunks) + `SG05/build_sg05.py`

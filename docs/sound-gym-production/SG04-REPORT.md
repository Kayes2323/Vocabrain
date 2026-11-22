# MINO Sound Gym — Lesson SG-04 Sound Contrast Lab — Delivery Report

Master Audio Production Brief v1.0. Scripts verbatim from the brief; no titles,
"Production:" instructions, answer keys or speaker labels spoken.

## Summary table

| Asset ID | Duration | Voices | Speech wpm | QA status | Issue |
|---|---|---|---|---|---|
| SG04-A01 | 66.80 s | Isabella, female British | n/a (word pairs) | REVIEW | Vowel/final-consonant distinction audibility — needs human listening (no hearing on this VM). Pairs repeated once, as "Listen twice" requires. |
| SG04-A02 | 101.77 s | Isabella, female British | n/a (single words) | REVIEW | "seat" could not be synthesised alone (see below) — supplied via pair-split workaround; distinction audibility needs human listening. |
| SG04-A03 | 124.82 s | Isabella, female British | 93.1 | REVIEW | 5 s pauses verified; sentence/word identification audibility needs human listening. |
| SG04-A04 | 61.98 s | Isabella, female British | n/a (word lists) | REVIEW | IPA slashes not vocalised (spoken as s / z / iz / t / d / id); past-tense lines merged into one chunk (see below). Distinction audibility needs human listening. |
| SG04-A05 | 62.89 s | Isabella, female British | n/a (single words) | REVIEW | Options NOT spoken — intro + 8 target words ×2 only, verified by chunk inventory. Target-word audibility needs human listening. |
| SG04-A06 | 39.90 s | Isabella, female British (Student) + Magnus, male British (Staff) | 144.8 | REVIEW | Two-voice dialogue; natural turn-taking needs human listening. |

Totals: 6 assets generated, 0 PASS, 6 REVIEW, 0 FAIL, 0 not generated.
All files: MP3, 24 kHz mono, ~64 kbps. All durations verified with ffprobe and
match speech + inserted pauses exactly.

## Voices and speeds
- Female British: avocado_v2:isabella (MINO-UK-VOICE-A) — all female parts.
- Male British: avocado_v2:magnus — Staff in SG04-A06 only (5 turns; Student 6 turns).
- Speeds: A01 82, A02 82, A03 85, A04 82, A05 92, A06 92.
- WPM method: words ÷ sum of chunk durations. Chunk durations include per-chunk
  TTS leading/trailing padding, so these are lower bounds on articulation rate.
  Active-speech cross-check (silences ≥0.5 s removed): A03 ~128 wpm, A06 ~188 wpm.

## Script verification (per asset)
- A01 — 14 chunks: intro + 5 pairs + repeat of the 5 pairs + 3 closing sentences.
  All 10 pair utterances present, words verbatim.
- A02 — 27 chunks: 2 intro sentences + 10 words × 2 passes + 5 closing sentences.
  All 10 words present twice (ship, sheep, sit, seat, full, fool, bad, bed, cup, cap).
  Pause 2.0 s between words verified (detected gaps 2.4–3.0 s incl. chunk padding).
- A03 — 24 chunks: 2 intro sentences + 5 labelled sentences × 2 passes + 2 closing
  sentences. Pause 5.0 s after each sentence verified (detected gaps 5.7–5.9 s × 10).
- A04 — 12 chunks, all script lines present. IPA lines spoken as sound names
  (see below). No extra vowels added to "walked"/"played" (single chunk, natural).
- A05 — 22 chunks: 6 intro sentences + 8 target words × 2. Target sequence verified:
  sheep, bad, van, cap, bags, buses, walked, wanted — each exactly twice, in that
  order. The options (ship or sheep, bad or bed, fan or van, cap or cab,
  books or bags, buses or books, walked or played, wanted or walked) were NOT
  spoken, and no unchosen option word appears anywhere in the audio
  ("books", "ship", "bed", "fan", "cab", "played" absent; "walked" occurs only
  as the correct target for item 7). ~1.5 s pause between items verified.
- A06 — 11 turns, dialogue order verbatim, ~0.8 s between turns.

## Pauses verified (ffmpeg silencedetect, final files)
- A01: 0.8 s gaps between all chunks. A02: 2.0 s between words.
  A03: 5.0 s after each sentence. A04: 0.8 s between lines.
  A05: 0.8 s between the two plays of a word, 1.5 s between items.
  A06: 0.8 s between turns.

## Failed attempts and workarounds (reported honestly)
1. "seat" (SG04-A02, single word): the TTS backend returned truncated/empty audio
   (26 bytes) on every attempt — 8+ tries across voices (Isabella, Magnus),
   speeds (82, 85, 100) and punctuation ("seat", "seat.", "Seat.", "seat!"),
   including retries minutes apart. The CLI's own retries also failed each time.
   Workaround: synthesised "sit, seat." (works), found the 0.81 s inter-word
   silence by silencedetect, and kept only the audio after it — exactly the
   spoken word "seat", same voice (Isabella) and speed (82). The 1.03 s clip
   is used for both occurrences of "seat". Spoken content is identical to the
   script; only the production route differs.
2. Single-letter IPA fragments (SG04-A04): "walked — t." failed the same way
   (26-byte truncated audio). The three past-tense lines are therefore
   synthesised as ONE continuous chunk ("walked — t. played — d. wanted — id.",
   8.18 s) instead of three separate chunks. Spoken words are identical to the
   script; the only difference is no 0.8 s pause between those three lines.
3. No other TTS failures. No asset was omitted.

## Pronunciation / QA notes
- All six assets are REVIEW, not PASS: nobody on this VM can hear audio, so
  vowel contrasts (ship/sheep, sit/seat, full/fool, bad/bed, cup/cap),
  consonant contrasts (sip/ship, bat/pat, fan/van, ten/den),
  final sounds (cat/cab/cap, bag/back, rice/rise, books/bags/buses,
  walked/played/wanted) and the A05 target words must be checked by listening.
  Kayes should confirm the contrasts are audible without exaggeration.
- A04 IPA: slash symbols were never vocalised. "/s/, /z/, /ɪz/" spoken as
  "s, z, iz"; "/t/, /d/, /ɪd/" spoken as "t, d, id". Flagged REVIEW as instructed.
- No background music, noise, echo or reverb added. No words added, removed,
  reordered or paraphrased (except the two production workarounds above, which
  change chunking only, not spoken words).

## Files
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A01.mp3
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A02.mp3
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A03.mp3
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A04.mp3
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A05.mp3
- ~/workspace/your_files/mino-sound-gym-master-brief-v1/SG04/SG04-A06.mp3
- Work files / build script: SG04/_work/ (chunks, concat lists, build_sg04.py,
  build-report.json)

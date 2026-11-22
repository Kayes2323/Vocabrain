# MINO Sound Gym — Master Audio Production Brief v1.0 — Delivery Report

Lessons SG-01 to SG-06. Scripts verbatim from the brief — no rewrites, no added words, no music, no spoken answer keys.

## Voice cast

- Female British (MINO-UK-VOICE-A): Isabella — `avocado_v2:isabella`
- Male British: Magnus — `avocado_v2:magnus`
- Female British 2 (Student C in SG06-A04): Paloma — `avocado_v2:paloma`
- Male Australian (SG06-A02 only): `avocado_v2:vd2_sunny_paddle`
- Female American (SG06-A03 only): Aria — `avocado_v2:MAI_01`
- All files: MP3, 24 kHz mono, 64 kbps. Each sentence/turn synthesised separately, then stitched with the specified pauses (verified with ffmpeg silencedetect).
- Speeds: diagnostic/teaching 82, guided 85, independent/IELTS/academic 92. Speech wpm below is computed from per-chunk durations, which include each TTS chunk's leading/trailing silence — so it understates in-sentence pace, especially for short word/number items (e.g. SG05-A01/A02, SG01-A01–A04). Full-sentence assets measure ~130–150 wpm.

## Totals

- Total assets generated: **36 / 36**
- PASS: **2** | REVIEW: **34** | FAIL: **0** | Not generated: **0**
- Total audio: **44.2 minutes** (2650 s), 21.2 MB
- TTS failures remaining: 0. Two single-word items failed repeatedly during production (see issues) and were supplied by documented workarounds with identical spoken content.

## Final delivery report

| Asset ID | Duration | Speech wpm | Voice/accent | QA status | Issue |
|---|---|---|---|---|---|
| SG01-A01 | 67.61 s | 88.4 | Female British — Isabella | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A02 | 80.52 s | 95.6 | Female British — Isabella | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A03 | 116.14 s | 94.1 | Female British — Isabella | REVIEW | Not aurally verified — needs Kayes to listen |
| SG01-A04 | 78.02 s | 96.6 | Female British — Isabella | REVIEW | Not aurally verified — 'an aim / a name' and 'ice cream / I scream' distinction must be checked by ear |
| SG01-A05 | 70.52 s | 139.6 | Male British — Magnus | REVIEW | Not aurally verified — needs Kayes to listen. Note: each sentence played twice consecutively, not as a full second pass — see report. |
| SG01-A06 | 45.94 s | 142.3 | Female British — Isabella (Student) + Male British — Magnus (Administrator) | REVIEW | Not aurally verified — needs Kayes to listen; 'Room 214' passed to TTS as digits, spoken form needs a listening check |
| SG02-A01 | 96.94 s | 101.5 | Female British (Isabella), speed 82 | REVIEW | Linking audibility not aurally verified on this VM; repeat of 5 sentences placed before closing 'Listen twice...' lines (closing spoken once); 4s pauses confirmed by silencedetect (~4.8s incl. padding). |
| SG02-A02 | 95.03 s | 100.2 | Female British (Isabella), speed 82 | REVIEW | IPA not vocalised: '/j/ or /w/' spoken as 'y or w'; glide linking audibility needs human listening; 3s example gaps confirmed (~3.7-3.8s incl. padding). |
| SG02-A03 | 77.71 s | 102.2 | Female British (Isabella), speed 82 | REVIEW | IPA not vocalised: /n/->/m/, /b/, /p/, /d/ and /j/->/dʒ/ spoken as letter names ('n','m','b','p','d and y ... like j'); assimilation/coalescence audibility needs human listening. |
| SG02-A04 | 70.06 s | 98.6 | Female British (Isabella), speed 82 (phrase pairs: careful 75 / connected 85) | REVIEW | Each phrase ('next day','last night','must be') spoken twice, careful then connected; /t/ omission audibility could not be verified by ear on this VM; '/t/ or /d/' spoken as 't or d'. |
| SG02-A05 | 100.50 s | 130.3 | Male British (Magnus), speed 92 | REVIEW | LIMITATION: items 5 ('We met them the next day') and 6 ('I must be careful') spoken naturally, but /t/ elision audibility cannot be confirmed by ear on this VM — Kayes must listen; if not audible, re-record needed. Each phrase played twice (2s between plays, 5s between items, both confirmed by silencedetect). No answers spoken. |
| SG02-A06 | 45.37 s | 150.9 | Female British (Isabella, Student) + Male British (Magnus, Administrator), speed 92 | REVIEW | No defect found in script/format/pause checks; date and times preserved exactly; speaker labels not spoken. REVIEW only because conversational naturalness could not be aurally verified on this VM. |
| SG03-A01 | 60.11 s | 105.2 | Female British — avocado_v2:isabella (MINO-UK-VOICE-A) | PASS | None. Script + repeat verified; aural check by listener still recommended. |
| SG03-A02 | 75.50 s | 94.3 | Female British — avocado_v2:isabella (MINO-UK-VOICE-A) | REVIEW | IPA /ə/ spoken as the word 'schwa' (slashes never vocalised). Weak-vowel audibility not aurally verified on this VM. |
| SG03-A03 | 89.50 s | 97.8 | Female British — avocado_v2:isabella (MINO-UK-VOICE-A) | REVIEW | IPA tokens replaced by the word itself (to/for/and/can/of); IPA distinctions not audible as distinct sounds. Weak vs strong 'can' ('I can do it.' / 'Yes, I CAN do it.') spoken as written; capitalisation may not add audible emphasis — needs human listening. |
| SG03-A04 | 73.32 s | 88.5 | Female British — avocado_v2:isabella (MINO-UK-VOICE-A) | REVIEW | Capitalised stress words NEW / BLUE / GO spoken as written; stress audibility not aurally verified on this VM. |
| SG03-A05 | 58.67 s | 145.3 | Male British — avocado_v2:magnus | REVIEW | Weak-form audibility in natural male delivery not aurally verified on this VM. Each sentence played twice, as specified. |
| SG03-A06 | 42.49 s | 134.0 | Female British — avocado_v2:isabella (Student) + Male British — avocado_v2:magnus (Staff) | PASS | None. 11 turns, voices distinct by construction, date preserved. |
| SG04-A01 | 66.80 s | n/a | isabella (female British) | REVIEW | Vowel/final-consonant distinction audibility needs human listening; pairs repeated once per 'Listen twice'. |
| SG04-A02 | 101.77 s | n/a | isabella (female British) | REVIEW | 'seat' single-word TTS failed repeatedly (26-byte truncated audio, all voices/speeds); supplied via 'sit, seat.' pair-split workaround, same voice/speed. Distinction audibility needs human listening. |
| SG04-A03 | 124.82 s | 93.1 | isabella (female British) | REVIEW | 5s pauses verified (detected 5.7-5.9s x10). Audibility needs human listening. |
| SG04-A04 | 61.98 s | n/a | isabella (female British) | REVIEW | IPA slashes not vocalised (s/z/iz/t/d/id). Past-tense lines merged into one chunk: single-letter fragments ('walked - t.') fail at TTS backend (26-byte truncated audio). Distinction audibility needs human listening. |
| SG04-A05 | 62.89 s | n/a | isabella (female British) | REVIEW | Options NOT spoken; intro + 8 target words x2 only (sheep, bad, van, cap, bags, buses, walked, wanted), verified by chunk inventory. Target-word audibility needs human listening. |
| SG04-A06 | 39.90 s | 144.8 | isabella (female British, Student), magnus (male British, Staff) | REVIEW | Two-voice dialogue (6 female turns, 5 male turns). Natural turn-taking needs human listening. |
| SG05-A01 | 75.44 s | 57.8 | Female British (Isabella) | REVIEW | Teen/ty stress distinction (thirteen/thirty etc.) not aurally verified — Kayes must listen. |
| SG05-A02 | 136.89 s | 63.2 | Female British (Isabella) | REVIEW | Teen/ty stress distinction is the whole point of the asset — needs a listening check. |
| SG05-A03 | 59.68 s | 108.5 | Female British (Isabella) | REVIEW | Dates/times/prices not aurally verified on this VM — Kayes must listen. |
| SG05-A04 | 69.45 s | 97.0 | Female British (Isabella) | REVIEW | Spelling clarity (letters distinct) not aurally verified — Kayes must listen. |
| SG05-A05 | 147.50 s | 130.7 | Male British (Magnus) | REVIEW | Corrections + spelling clarity not aurally verified — Kayes must listen. |
| SG05-A06 | 60.11 s | 128.6 | Female British (Isabella, Student) + Male British (Magnus, Administrator) | REVIEW | Dialogue naturalness and number accuracy not aurally verified — Kayes must listen. |
| SG06-A01 | 42.85 s | 136.0 | isabella, magnus | REVIEW | Voice/accent distinction needs human listening |
| SG06-A02 | 46.86 s | 149.8 | vd2_sunny_paddle | REVIEW | Australian accent needs human listening; no British voice used |
| SG06-A03 | 41.84 s | 142.4 | MAI_01 | REVIEW | Re-rendered at speed 82 (was 168.0 wpm at speed 92); now 142.4 wpm, in line with the other SG-06 assets. American accent needs human listening. |
| SG06-A04 | 54.48 s | 134.5 | isabella, magnus, paloma | REVIEW | Student B (Isabella) vs Student C (Paloma) distinction needs human listening |
| SG06-A05 | 60.54 s | 138.5 | magnus | REVIEW | Academic monologue pace/clarity needs human listening |
| SG06-A06 | 52.23 s | 146.5 | isabella, magnus | REVIEW | Voice/accent distinction needs human listening |

## Issues that need Kayes's decision / listening check

1. **Nothing was aurally verified on this VM** — nobody here can hear audio. Every asset needs a human listen before publishing, especially: an aim / a name and ice cream / I scream (SG01-A02/A04, Audio 001 too), assimilation & elision audibility (SG02-A03/A04/A05 items 5–6), weak forms & schwa (SG03), vowel/consonant distinctions (SG04), teen/ty stress (SG05-A01/A02), and the three accents + Student B vs C in SG06.
2. **IPA symbols were never vocalised as symbols** (SG02, SG03, SG04). They were spoken as sound/letter names — e.g. /ə/ as “schwa”, /j/ as “y”, /dʒ/ as “j”. If the IPA symbols themselves must be demonstrated, that needs a different production approach.
3. **SG02-A04/A05 elision:** each phrase was spoken twice (careful + connected), but whether the /t/ omission is actually audible in the TTS output could not be confirmed by ear. If Kayes finds it inaudible, the asset needs a re-record, not a script change.
4. **SG03-A03 weak vs strong “can”:** “I can do it.” / “Yes, I CAN do it.” were spoken as written; capitalisation may not add audible emphasis. The IPA weak-form distinctions are not audible as distinct sounds — the words were spoken naturally instead.
5. **SG01-A05 repeat interpretation:** “play each sentence twice” was done as each sentence twice consecutively, then a 5 s pause — not a full second pass of all five. Rebuild if the full-pass version was intended.
6. **SG01-A06 “Room 214”:** passed to TTS as written digits; its spoken form (two-one-four vs two hundred and fourteen) needs a listening check.
7. **SG04-A02 “seat”:** the single word “seat” returned truncated/empty audio (26 bytes) on 8+ TTS attempts across voices/speeds. Workaround: synthesised “sit, seat.”, split at the inter-word silence, and used the 1.03 s “seat” clip for both occurrences — same voice/speed, spoken content identical to script.
8. **SG04-A04 past-tense endings:** “walked — /t/” failed the same way, so the three past-tense lines were synthesised as one continuous chunk — spoken words identical, just no 0.8 s pause between those three lines.
9. **SG06-A03 speed fix (done):** first render at speed 92 measured 168 wpm — noticeably faster than the other SG-06 assets. Re-rendered at speed 82: now 41.84 s, 142.4 wpm, in line with the rest.
10. **SG01-A04:** “Context A/B:” labels were spoken so learners can tell the contexts apart.
11. **SG05 spelling:** surnames were sent to TTS as spaced letters (“W I L S O N”, “W I L K I N S O N”) so each letter is pronounced distinctly. All corrections in SG05-A04/A05 were preserved, including the initial incorrect information.

## Files in the zip

- `SG01/` … `SG06/` — the 36 MP3s (`SG01-A01.mp3` … `SG06-A06.mp3`)
- `SG01/SG01-REPORT.md` (+ `.json`) … `SG06/SG06-REPORT.md` (+ `.json`) — per-lesson reports with full detail
- This delivery report.

# MINO Sound Gym — Lesson SG-03 Weak Forms Hunter — Delivery Report

Master Brief v1.0. Assets SG03-A01 to SG03-A06 only. No other lesson touched.

## Summary table

| Asset ID | Duration | Voices | Speed | Speech wpm* | QA status | Issue |
|---|---|---|---|---|---|---|
| SG03-A01 | 60.11 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 105.2 | PASS | None. Script + repeat verified; aural check by listener still recommended. |
| SG03-A02 | 75.50 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 94.3 | REVIEW | IPA /ə/ spoken as the word "schwa" (slashes never vocalised). Weak-vowel audibility not aurally verified on this VM. |
| SG03-A03 | 89.50 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 97.8 | REVIEW | IPA tokens replaced by the word itself (see below). Weak vs strong "can" ("I can do it." / "Yes, I CAN do it.") spoken as written; capitalisation may not add audible emphasis — needs human listening. |
| SG03-A04 | 73.32 s | Female British — Isabella (MINO-UK-VOICE-A) | 82 | 88.5 | REVIEW | Capitalised stress words NEW / BLUE / GO spoken as written; stress audibility not aurally verified on this VM. |
| SG03-A05 | 58.67 s | Male British — Magnus | 92 | 145.3 | REVIEW | Weak-form audibility in natural male delivery not aurally verified on this VM. Each sentence played twice, as specified. |
| SG03-A06 | 42.49 s | Female British — Isabella (Student) + Male British — Magnus (Staff) | 92 | 134.0 | PASS | None. 11 turns, voices distinct by construction, date preserved. |

\* Speech wpm = spoken words ÷ sum of chunk-file durations. Chunk durations include TTS leading/trailing padding, so this is an approximate lower bound on true speaking rate, not a precise speech-rate measurement. A01–A04 at speed 82 measured 88–105 wpm by this method (diagnostic/teaching pace, as intended); A05–A06 at speed 92 measured 134–145 wpm.

Totals: 6 generated, 2 PASS, 4 REVIEW, 0 FAIL. No failed TTS attempts — all 80 chunks synthesised first try. No assets could not be generated.

## Files

- `SG03-A01.mp3` (471 KB)
- `SG03-A02.mp3` (591 KB)
- `SG03-A03.mp3` (700 KB)
- `SG03-A04.mp3` (574 KB)
- `SG03-A05.mp3` (460 KB)
- `SG03-A06.mp3` (333 KB)

All MP3, 24 kHz mono, 64 kbps. Durations confirmed by ffprobe and match the stitched totals exactly (speech + 0.8 s inserted silence between chunks). Silence detection confirms gaps are present throughout each file. Work files and build script: `SG03/_work/` (`build_sg03.py`, `build.log`, `build-report.json`).

## Method

- Each sentence / turn / example synthesised as a separate chunk with its assigned voice (`/opt/hatch/bin/tts speak --voice <id> --language en --speed <n> --format mp3 --text-stdin`), converted to 24 kHz mono wav, stitched with ffmpeg with 0.8 s silence between chunks, encoded MP3 64k.
- Speeds: A01–A04 = 82 (diagnostic/teaching); A05–A06 = 92 (independent / IELTS transfer). No asset in SG-03 is labelled "Guided", so the brief's guided speed 85 was not used in this lesson.
- No asset titles, "Production:" instructions, speaker labels ("Student:", "Staff:") or answer keys were spoken. Numbered items spoken as written ("One:", "Two:", "A.", "B.").
- A01: intro, 5 numbered sentences, repeat of all 5 once, closing instruction — 12 chunks.
- A05: intro, each of the 5 numbered sentences twice consecutively, closing (For each sentence: A. / B. / Listen twice…) — 15 chunks.
- A06: 11 dialogue turns, ~0.8 s between turns, no overlap.

## IPA handling (A02 / A03) — REVIEW

Slash symbols were never vocalised. Substitutions, documented here rather than silently changed:

- A02: "Its symbol is /ə/." → spoken "Its symbol is schwa."
- A03: "'To' can be pronounced /tə/ or /tʊ/ in an unstressed position, while /tuː/ is possible when it is stressed." → spoken with the word "to" in place of each IPA token: "'To' can be pronounced 'to' or 'to' in an unstressed position, while 'to' is possible when it is stressed."
- A03: "'For' may sound like /fə/…" → "'For' may sound like 'for'…"
- A03: "'And' may be reduced to /ən/ or simply /n/." → "'And' may be reduced to 'and' or simply 'n'."
- A03: "'Can' may sound like /kən/…" → "'Can' may sound like 'can'…"
- A03: "'Of' may be pronounced /əv/ or /ə/…" → "'Of' may be pronounced 'of' or 'of'…"

Consequence: the IPA distinctions themselves are not audible as distinct sounds in A03 — the learner hears the word "to/for/and/can/of" repeated naturally. If Kayes/ChatGPT wants the actual schwa/reduced vowel sounds demonstrated, that needs a different production approach (e.g. a speaker deliberately modelling the reduced vowel). Flagged for human decision, not fixed silently.

## Stress / emphasis (A03 / A04) — REVIEW

- A03 "Yes, I CAN do it." was spoken exactly as written. TTS capitalisation may not produce audible emphasis; I cannot hear the audio on this VM, so whether the strong form is actually stressed must be checked by listening.
- A04 "I bought a NEW phone yesterday." / "I wanted the BLUE one." / "She can GO tomorrow." — same: spoken as written, stress audibility unverified. No shouting was added.

## Script verification

All six scripts were taken verbatim from the Master Brief v1.0, in order, with no added, removed or reordered words except the IPA substitutions above (A02/A03) and the specified repeats (A01 repeat-all-5; A05 each-sentence-twice). Spoken transcripts:

**A01:** "Listen to these sentences. Pay attention to the small words." / "One: I want to go to the library." / "Two: She was at the station." / "Three: We can meet after lunch." / "Four: A cup of tea, please." / "Five: There are a lot of people outside." / [repeat of the five] / "Listen twice. Identify the small words that are difficult to hear clearly."

**A02:** "In English, some vowel sounds become very short and weak when a word is not stressed." / "One of the most common weak vowel sounds is called schwa. Its symbol is schwa." / "Listen to these words:" / "about" / "today" / "support" / "problem" / "police" / "Notice the unstressed vowel sounds." / "The schwa is short and relaxed. It is not pronounced like a strong, full vowel." / "Now listen to these examples in sentences:" / "I'll see you today." / "We need some support." / "There is a problem." / "Remember: the schwa usually appears in an unstressed syllable. It is one reason why English spelling and pronunciation can seem so different."

**A03:** "Many common English function words have weak forms in natural speech." / "Listen to these pairs." / "'To' can be pronounced 'to' or 'to' in an unstressed position, while 'to' is possible when it is stressed." / "'For' may sound like 'for' in an unstressed position." / "'And' may be reduced to 'and' or simply 'n'." / "'Can' may sound like 'can' when it is not emphasised." / "'Of' may be pronounced 'of' or 'of', depending on the context and accent." / "'Was' may also have a weak form." / "Now compare:" / "I can do it." / "Yes, I CAN do it." / "In the second sentence, 'can' receives emphasis." / "A weak form is not necessarily quieter because the speaker is speaking softly. It is often shorter and less stressed." / "The context and the speaker's emphasis determine the pronunciation."

**A04:** "In English, not every word receives equal stress." / "Content words often carry the main information. These include nouns, main verbs, adjectives and adverbs." / "Function words such as articles, prepositions and auxiliary verbs are often unstressed." / "Listen:" / "I bought a NEW phone yesterday." / "The main stress is on 'new' and 'phone'." / "Now listen:" / "I wanted the BLUE one." / "The word 'blue' receives contrastive stress." / "Listen again:" / "She can GO tomorrow." / "The main information is carried by 'go' and 'tomorrow'." / "When listening, pay attention to the stressed words. They often help you understand the main message."

**A05:** "You will hear five sentences." / "One: I'd like to speak to the course director." ×2 / "Two: There was a problem with the payment." ×2 / "Three: You can leave it on the desk." ×2 / "Four: A number of students were waiting outside." ×2 / "Five: We need to prepare for the final examination." ×2 / "For each sentence:" / "A. Identify one weak-form word." / "B. Identify the main stressed information word." / "Listen twice. Do not read the transcript during the first attempt."

**A06:** Student (Isabella): "Hello. I heard that the university offers academic support sessions." / Staff (Magnus): "Yes, we do. They are designed to help students with academic writing and study skills." / Student: "When do the sessions begin?" / Staff: "The first session is on the twenty-third of September." / Student: "Do I need to pay?" / Staff: "No, they are completely free." / Student: "How can I register?" / Staff: "You can register online through the student portal." / Student: "Should I bring anything?" / Staff: "Please bring a notebook and a pen." / Student: "Thank you. That sounds helpful."

## Honest limit

I cannot hear audio on this VM. Durations, formats, chunk inventory, pauses and script completeness were verified from the files themselves (ffprobe + silencedetect + build log), but weak-form reduction, schwa quality, contrastive stress and the weak/strong "can" contrast were NOT aurally verified. The four REVIEW assets need a human listen before publishing.

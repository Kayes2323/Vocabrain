# MINO — Official Bangla Voice Identity (Voice A)

Status: APPROVED by the product owner on 2026-11-25 as the single voice for all
MINO Bangla audio (welcome, Task 1 lesson, Task 2 lesson, My Brain, and all
future Bangla narration). Production starts from this profile. No other voice
is to be used for MINO Bangla audio unless the owner approves a change.

Reference audio: `MINO_BN_VOICE_A_v2.mp3` (25.64 s) — the approved sound of MINO.

## Voice

- Name: Sarah — "Mature, Reassuring, Confident"
- Voice ID: `EXAVITQu4vr4xnSDxMaL`
- Provider / model: ElevenLabs premade / eleven_v3
- Language: Bangla (`bn`)
- Character: adult female, warm, friendly, confident but never commanding,
  mature and reassuring — a real private tutor speaking to one learner.
  Not childish, not overly sweet, not theatrical.

## Settings (fixed for every MINO Bangla asset)

- Speed: 1.0 (natural). Note: the ElevenLabs API speed setting has no real
  effect on eleven_v3 (tested: 0.7 gave only ~3% change), so pace is set by
  segmentation and pauses, never by the speed parameter.
- Stability: 0.4 (a touch more expressive/warm than the 0.5 default)
- Similarity boost: 0.75
- Style: 0.0 (no exaggeration)
- Loudness: all assets normalised to −16 LUFS (loudnorm I=−16, TP=−1.5)
- Format: MP3, 128 kbps, 44.1 kHz. No music, no effects, no reverb.

## Pronunciation rules (Bangla accent)

- MINO is pronounced মিনো — write মিনো in the TTS text, never "Mino"/"MINO".
- **IELTS is pronounced as one smooth word — আইএলটস** (like English "IELTS"
  /aɪəlts/). Never spell it out letter by letter (আইইএলটিএস) — that sounds
  unprofessional. Fixed 2026-11-26 after the owner flagged it; clip 01
  segments 2 and 5 and clip 08 segment 1 must be re-generated with আইএলটস.
- Task 1 → টাস্ক ওয়ান, Task 2 → টাস্ক টু.
- English IELTS/product loanwords are written in Bangla script so they are
  pronounced with Bangla phonetics (words and meaning unchanged):
  Writing → রাইটিং, chart → চার্ট, Overview → ওভারভিউ, essay → এসে,
  idea → আইডিয়া, My Brain → মাই ব্রেইন, Vocabulary → ভোকাবুলারি,
  revise → রিভাইজ. Add new loanwords to this list the same way, in Bangla
  script, as scripts arrive.
- Always use আপনি, never তুমি.

## Delivery / pauses

- Generate clause by clause (one clip per clause, same voice and settings),
  trim leading/trailing silence, then join with exact silence beds.
- Pauses (from the approved v2): 0.7 s after the greeting sentence,
  0.5 s between list clauses, 0.9 s before a new idea, 0.7 s after a short
  reassurance sentence, 1.0 s beat before the gentle closing
  ("চলুন, শুরু করি।").
- Conversational, warm, confident, supportive. No artificial excitement,
  especially at the end.

## Production rules

- Every script comes from the owner verbatim. Never rewrite, add or remove
  sentences, and never guess a transcript. If a script is missing, stop and
  ask for it — do not invent one.
- Each finished asset is verified before delivery: duration, pause gaps,
  transcript check, peaks (no clipping), segment audit (no missing/extra
  sentence). Deliver finished assets one by one in chat as they are done.
- Working files live in `~/workspace/mino-listening-batch01/audition-bn/`
  (v2 segments, script and assembly notes in `v2/`).

## Licence and limits (honest note)

- Made on ElevenLabs Free: no commercial licence. Starter ($1 first month)
  covers commercial use in the learning app.
- Sarah is a premade American voice speaking Bangla; the Bangla-script
  loanwords help, but her base accent is not Bangladeshi. A true Bangladeshi
  accent needs a native Voice Library voice (e.g. Rimjhim), which Free blocks
  via API (HTTP 402) and Starter unlocks. If the owner later approves the
  Starter route, this profile is re-issued with the native voice ID — the
  pronunciation, pause and loudness rules stay the same.

## History

- 2026-11-25: Stage 1 audition (A Sarah / B Bella / C George). Owner picked A.
- 2026-11-25: A v2 — clause-wise pauses, warmer stability 0.4, Bangla-script
  loanwords. Owner approved ("Thik ache, evabe...") and ordered production
  of all MINO Bangla audio with this voice, starting the same day.

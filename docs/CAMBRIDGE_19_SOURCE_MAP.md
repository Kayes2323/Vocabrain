# Cambridge IELTS 19 — source inventory and mapping report

Status: **no Cambridge 19 test is integrated or marked ready.** All four tests
stay "not available" in `lib/ielts/content/cambridge-catalog.ts`
(`linkedTestId` undefined). This report records what was supplied, what could
be read, and what blocks integration. It contains structure only — no book
text, questions or answers.

## 1. Supplied files

| # | File | Location | Format | Size | Notes |
|---|------|----------|--------|------|-------|
| 1 | `Cambridge 19 Academic_compressed.pdf` | Drive of azizkayes2005@gmail.com, id `1w-NNEUUDOf94nDgV_F48VHSxcr1Npjxq` | PDF, compressed | 15.3 MB | The only Cambridge file in the Drive (searched by full text "Cambridge" and by recent files). No audio, image or separate answer-key files were found. |

The other Drive files matching "IELTS"/"Cambridge" (a personal test report
form, ORPS terms, a Writing phrase bank, unrelated ID documents) are **not**
Cambridge 19 material and were not used.

## 2. How the file was read

- Direct download was blocked: the Drive download tool caps at 10 MB and the
  sandbox proxy refuses `drive.google.com`.
- The Drive text-extraction endpoint returned the PDF's text layer, but
  **truncated** (~109k characters, 3,473 lines). Extraction stops in the
  middle of **Test 4 Listening, Part 3** (printed page ~81).
- Text layer only: no images, diagrams, charts, tables-as-images or audio.

## 3. Source-to-destination mapping (what the readable text shows)

Verified from headings in the extracted text, not from the table of contents.

| Source section | Destination | Readable? |
|---|---|---|
| Test 1 Listening, Parts 1–4 (Q1–40) | cambridge-19 / Test 1 / Listening | Question text yes; audio no |
| Test 1 Reading, Passages 1–3 (Q1–40) | cambridge-19 / Test 1 / Reading | Text yes; figures/tables unverified |
| Test 1 Writing, Tasks 1–2 | cambridge-19 / Test 1 / Writing | Task 2 text yes; Task 1 visual **not** in text layer |
| Test 1 "SPEAKING" Parts 1–3 | cambridge-19 / Test 1 / Speaking | Headings present — see §4 |
| Test 2 Listening / Reading / Writing / Speaking | cambridge-19 / Test 2 | Same pattern as Test 1 |
| Test 3 Listening / Reading / Writing / Speaking | cambridge-19 / Test 3 | Same pattern as Test 1 |
| Test 4 Listening Parts 1–3 (to Q25-ish) | cambridge-19 / Test 4 / Listening | Partial — cut off |
| Test 4 Listening Part 4, Reading, Writing, Speaking | cambridge-19 / Test 4 | **Not extracted** |
| Audioscripts | transcripts | **Not extracted** |
| Listening and Reading answer keys | answer keys, Tests 1–4 | **Not extracted** |
| Sample Writing answers | reference only | **Not extracted** |

The printed table of contents lists page numbers 4, 10, 33, 55, 99, 120, 128,
139, 143 for ten entries, so one number was lost in extraction. Test 4's start
page is therefore **ambiguous**; do not rely on the TOC for it.

## 4. Blockers (why nothing is "ready")

1. **No answer keys readable.** Without the keys no question can be mapped to a
   validated answer, so objective scoring cannot be enabled for any test.
2. **No audio.** The PDF does not contain audio (the cover says "With Audio",
   but audio is a separate download that was not supplied). Listening cannot be
   launched without correct audio-to-part files.
3. **Incomplete text.** Test 4 is only partly readable.
4. **Visuals missing.** Writing Task 1 charts/diagrams, Listening maps/plans and
   any Reading figures are images, absent from the text layer.
5. **Speaking prompts.** Headings exist, but the book's Speaking pages need
   page-level checking against the real PDF; this was not verifiable here.
6. **Provenance.** The file is a Chinese-market reprint (Qunyan Press cover,
   third-party `@MirsIELTS` watermark on the introduction page), not a
   Cambridge-issued file. This does not obviously match an email authorization
   from the publisher. Before embedding the book's text in this repository,
   confirm in writing that the permission covers (a) this edition/file and
   (b) redistribution inside the app. The agent did not copy the book's
   passages or questions into the repo.

## 5. What is needed to finish

- The full PDF (or per-test PDFs) delivered to the repo environment, plus the
  Cambridge 19 audio files (Tests 1–4, Parts 1–4) and page images for
  figures. Easiest path: add the files to a private storage bucket or the
  session's allowed host list.
- Written confirmation of the licence scope (§4.6).
- Then: extract per test into the existing `PracticeTest` model
  (`lib/ielts/model.ts`), link via `linkedTestId`, and run
  `lib/ielts/validate.ts` (`isPublishable`) — only a passing test becomes
  launchable in the UI. Writing/Speaking stay unscored (self/teacher review)
  as the engine already treats them.

## 6. Code changes in this task

Documentation only (this file). The catalog, engine, routes and tests are
unchanged, so the existing "coming soon" state remains correct and honest.

## 7. Verification

No student-flow, lint, build or test run was performed for Cambridge 19,
because no content was integrated.

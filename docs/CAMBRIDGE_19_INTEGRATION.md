# Cambridge IELTS 19 — source inventory & mapping report

Status: **inventory and mapping only. No Cambridge 19 test content has been added to the app.**
`cambridge-19` tests 1–4 stay "not available" in `lib/ielts/content/cambridge-catalog.ts`
(`linkedTestId` undefined), which is the correct honest state.

This report describes the *structure* of the two supplied files (page ranges, what each
page range is). It contains no book text.

## 1. Supplied files

| # | File | Pages | Format | Notes |
|---|------|-------|--------|-------|
| A | `0cbd2340-Cambridge_19_Academic_compressed_compressed-1-70.pdf` | 70 | Scanned images (JPEG per page), **no text layer** | Book cover through Test 3 Reading Passage 3 |
| B | `09065693-Cambridge_19_Academic_compressed_compressed-1-138-70-138.pdf` | 69 | Scanned images, **no text layer** | Rest of Test 3, all of Test 4, audioscripts, answer keys, sample Writing answers, back cover |

No audio files, no separate image/diagram files and no answer-key spreadsheets were supplied.
Producer on both files is iLovePDF. The edition is the Qunyan Press (China) reprint of
*Cambridge IELTS 19 Academic*, and the audioscript / answer-key / sample-writing pages carry a
third-party watermark overlay ("@MirsIELTS").

## 2. Page map

Printed page numbers are PDF page + 1 from A5 onward (the printed page 5 is missing from file A).
Ranges come from visual inspection of page thumbnails and may be off by one at boundaries.

| Content | File / PDF pages | Printed pages |
|---------|------------------|---------------|
| Cover, title, contents, introduction (scoring, format) | A1–A8 | 1–9 |
| **Test 1** Listening (Parts 1–4) | A9–A14 | 10–15 |
| **Test 1** Reading (Passages 1–3) | A15–A28 | 16–28 |
| **Test 1** Writing Task 1 / Task 2 | A29 / A30 | 29 / 31 |
| **Test 1** Speaking (Parts 1–3) | A31 | 32 |
| **Test 2** Listening | A32–A38 | 33–39 |
| **Test 2** Reading | A39–A50 | 40–51 |
| **Test 2** Writing Task 1 / Task 2 | A51 / A52 | 52 / 53 |
| **Test 2** Speaking | A53 | 54 |
| **Test 3** Listening | A54–A60 | 55–61 |
| **Test 3** Reading | A61–A70, B1 (A70 ≡ B1), B2–B4 | 62–74 |
| **Test 3** Writing Task 1 / Task 2 | B5 / B6 | 75 / 76 |
| **Test 3** Speaking | B7 | 77 |
| **Test 4** Listening | B8–B13 | 78–83 |
| **Test 4** Reading | B14–B25 | 84–95 |
| **Test 4** Writing Task 1 / Task 2 | B26 / B27 | 96 / 97 |
| **Test 4** Speaking | B28 | 98 |
| Audioscripts: Test 1 / 2 / 3 / 4 | B29–B32 / B33–B38 / B39–B43 / B44–B49 | 99–119 |
| Answer keys: divider + T1 Listening | B50 | 120 |
| Answer keys: T1 Reading, T2 L, T2 R, T3 L, T3 R, T4 L, T4 R | B51, B52, B53, B54, B55, B56, B57 | 121–127 |
| Sample Writing answers (T1–T4, Tasks 1–2) | B58–B68 | 128–138 |
| Back cover | B69 | — |

## 3. Problems found

- **Both files are image-only scans.** There is no embedded text, so any content would have to
  come from OCR or manual transcription, and no OCR tool is installed in this environment.
- **No audio supplied.** The Listening sections need recordings (`ListeningAudio.src`), and none
  were provided. Audioscripts exist as scanned pages, but the engine's script fallback would be a
  synthetic read-aloud of book text, not the real exam audio.
- **Duplicate page:** A70 and B1 are the same page.
- **Missing page:** printed page 5 (the introduction page between pp. 4 and 6) is absent from A.
- **Missing tail:** printed pp. 139–143 (sample answer sheets, acknowledgements) are not in B.
- **Scan quality:** Writing Task 1 charts/maps/process diagrams are embedded in the page
  rasters; they would need cropping into separate image assets.
- **Watermark overlay** on the audioscript, answer-key and sample-writing pages.

## 4. Why nothing was integrated

The task asks for full transcription of four tests (every passage, question, option, audioscript,
answer key) into the app's data files. That is wholesale reproduction of a publisher's book, and
the licence gate in `lib/ielts/validate.ts` (`licensed-publisher` + `licensed`) exists to prevent
unverified content from shipping. The only evidence of permission is the user's statement of an
email authorisation, which could not be verified here, and the supplied files are a third-party
circulated scan rather than files provided by the publisher. Transcription was therefore not
started.

## 5. What is needed to proceed

1. Written licence/permission text (or the publisher's own digital files, which normally include
   the audio and are far more reliable than scans).
2. The audio files, one per Listening part, named so each maps to Test/Part.
3. A decision on how to ingest: publisher-supplied structured data, or a manual transcription
   done by someone holding the licence. The existing model (`lib/ielts/model.ts`) and
   `validateBook` already cover everything needed; no new content system is required.
4. When content exists: add a `TestBook` with `sourceType: 'licensed-publisher'`,
   `licenseStatus: 'licensed'`, register it in `lib/ielts/content/index.ts`, and set each
   `CambridgeTestMeta.linkedTestId` in the catalog. Tests stay unavailable until `validateTest`
   passes with zero errors.

## 6. Student-facing state today

Cambridge IELTS 19 appears in the library with Tests 1–4, each with an overview page that
shows "not available" (no linked test). Start Mock Test is not offered. This was not changed.

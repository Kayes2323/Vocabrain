# Study Abroad

Phase 3 (3A–3Q) turns Study Abroad from a country list into a guided journey:
**information → decision → action**, for one dream country at a time.

## Non-negotiable content rules

- **No invented facts.** Tuition, visa rules and fees, deadlines, scholarships,
  university requirements, work rules and immigration information appear only
  as a `SourcedValue` (value, source name/url/type, `lastVerified`, optional
  `reviewAt` / `validFrom` / `validUntil`) copied from an official page.
- **Statuses are computed, never stored.** Verified / Partly verified / Not
  verified yet, scholarship open/closed, deadline buckets and “needs review”
  are all derived from the data and today’s date.
- A fact past its review window (`REVIEW_AFTER_DAYS` in `lib/abroad/sections.ts`)
  shows “Needs review” and stops counting as verified.
- Sample data must be marked `sample: true` (`ContentMeta`) and never shown as real.
  There is none today.
- Images need `LicensedImage` metadata (source, credit, licence). None are
  licensed yet, so every country shows a flag placeholder marked “Photo coming”.
- Mino separates **VERIFIED** facts (with source + date) from **GENERAL
  GUIDANCE**, and says “not verified yet” instead of filling gaps.

## Routes

| Route | What |
|---|---|
| `/abroad` | Home: 10-stage journey, next action, attention, tools, dream country, shortlist |
| `/abroad/countries` | Explorer: 14 priority countries in order, then 6 more; search, region, shortlist |
| `/abroad/countries/[code]?tab=` | Country hub (one template): 6 tabs, 24 sections, official vs Mino blocks |
| `/abroad/countries/[code]/roadmap` | 16-step roadmap: tick, target date, documents, action, Ask Mino |
| `/abroad/country-match` | Priorities → matches from verified metrics; explore / shortlist / dream / compare |
| `/abroad/compare?c=de,gb,ca` | Up to 3 countries, row by row from hub sections |
| `/abroad/universities` | The student’s own list (fit, status, official link) + verified profiles (none yet) |
| `/abroad/scholarships` | Country scholarship facts + verified scholarships (none yet), funding filter |
| `/abroad/deadlines` | Own dates + roadmap targets + IELTS test + official dates, by bucket |
| `/abroad/documents` | Required documents from the roadmap, readiness, general guides |
| `/abroad/visa`, `/abroad/visa/[code]` | 12-part visa guide per country, official pages |

Five hubs (`components/abroad/HubBar.tsx`): Journey · Explore · Money · Apply · Visa & go.

## Data

- **Registries (reviewed, typed, CMS/API-ready):** `lib/content/countries.ts`,
  `universities.ts`, `scholarships.ts`, `deadlines.ts`, `visa.ts` (empty until
  verified), `documents.ts` (general guidance), `roadmap.ts` (16-step template).
  `scripts/test-study-abroad.ts` fails if a registry record lacks an official link or source.
- **Student data** (`users/{uid}.app.abroad`): `dreamCountryCode`,
  `preferredCountryCodes` (shortlist), `journey.marks` (stage ticks),
  `journey.steps[country][step]` (roadmap ticks and target dates, kept per
  country), `universities`, `savedScholarships`, `deadlines`, `documents`.
  No Firestore rule change was needed.
- **Migration:** the old 8 computed stages stored nothing; their rules live on in
  the new stages (goal → Discover, destination → Choose a country, IELTS →
  English). Nothing is deleted when switching countries.

## Engines

- `lib/engine/abroad-journey.ts` — journey, roadmap, `markStage`, `markStep`, `setStepDue`.
- `lib/engine/abroad-tracker.ts` — universities, deadlines (`allDeadlines`), documents,
  `abroadNextAction` (urgent date → roadmap step → stage), used by home and Mino.
- `lib/abroad/sections.ts` (hub statuses), `visa.ts`, `compare.ts`, `status.ts`, `summary.ts` (Mino).

## Mino

- Snapshot line + `getStudyAbroadProfile` progress (journey, roadmap step, dates,
  documents, university list — student text quoted), `getCountryData` section and
  visa-part statuses and official pages.
- Asks from screens: `abroad-next`, `abroad-fit`, `abroad-section`, `abroad-step`,
  `abroad-unis`, `abroad-doc`, `abroad-visa`, `abroad-compare`.
- Action buttons: `abroad-journey`, `compare`, `universities`, `scholarships`,
  `deadlines`, `documents`, `visa` (+ earlier `countries`, `country-match`, `abroad-profile`).

## Tests

- `pnpm test:study-abroad` — 28 unit tests (journey, roadmap, hub, statuses, centres, compare, next action, Mino summary, registry integrity).
- `pnpm test:e2e:abroad` — 143 checks: EN desktop + BN mobile, light and dark, Firestore persistence, no sideways scroll.

## Audit (end of Phase 3)

**DONE:** journey (10 stages, migration, attention), dream country + shortlist,
explorer, country hub template, data models, roadmap, universities list,
scholarships and visa structure, deadlines, documents, Country Match actions,
compare, Mino integration, next-action system, E2E + unit tests.

**PARTIALLY DONE:** Country Match still scores only two verified metrics
(post-study work, work while studying); visa guides use the facts the registry
already has (money to show, official pages).

**NEEDS CONTENT:** country overviews (taglines, why/cities/culture/safety),
Mino explanations per section, roadmap country overrides.

**NEEDS VERIFIED DATA:** tuition, scholarships, universities/programs, official
deadlines, visa parts (type, fees, processing…), 10 of the 14 priority countries
(KR, US, JP, IT, FR, NL, SE, FI, IE, NZ) have no verified facts yet; licensed photos.

**FUTURE FEATURE:** cost calculator, applications tracker, pre-departure
checklist, SOP/CV/LOR builders, reminders/notifications for dates, CMS/API for content.

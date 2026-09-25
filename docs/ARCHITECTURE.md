# Vocab Brain: Architecture

Vocab Brain is growing from an IELTS vocabulary trainer into a student platform:
**IELTS preparation + vocabulary mastery + AI mentorship (Mino) + study-abroad planning.**
This document records the Phase 1 audit, the target architecture and the rules that keep
the system coherent as features are added.

## 1. Phase 1 audit (starting point)

| Area | Before Phase 1 |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui |
| Routing | One page (`/`) with tab state in `FirebaseApp.tsx` |
| State | Component `useState` only; nothing persisted except the subscription |
| Auth / DB | Firebase Auth (email + Google), Firestore `subscriptions/{uid}` |
| Payments | Stripe Checkout route + webhook (webhook upgrade logic still a TODO) |
| Vocabulary | 6 topic lessons × 10 words (Bengali meanings); 210-word IELTS bank by band 6–9 |
| Orphaned | `IELTSDashboard`, `IELTSStudyView`, `IELTSBandCalculator`, `AdminPanel` were never rendered |

Issues found and fixed in Phase 1:

- `pnpm build` failed without `STRIPE_SECRET_KEY` (client created at import). The client is now lazy (`getStripe()`).
- Checkout redirected to a non-existent `checkout.stripe.com/pay/{id}` URL. It now uses `session.url`.
- The Geist font was loaded but never applied; the page title was "v0 App".
- `StudyView` labelled the Bengali meaning as "English".
- Two TypeScript errors (the build ignored type errors).
- `.gitignore` was UTF-16, so git ignored none of it (e.g. `.next/`).

Known issues left for follow-up:

- **Security:** Firestore rules let a signed-in user write `plan: 'premium'` to their own subscription.
  Premium must be granted only by the Stripe webhook via the Admin SDK.
- `AnalyticsDashboard.tsx` shows hard-coded mock numbers. It is no longer routed, so students never see
  invented stats. Rebuild it on real `IELTSActivity`/`VocabularyReview` data.
- `AdminPanel.tsx` edits an in-memory copy of the word bank only; not routed.

## 2. Information architecture

```
/onboarding            Mino-guided first run (language, goal, target, experience, study time)
/                      Home: where am I, where am I going, what do I do today
/ielts                 IELTS hub
  /diagnostic          Find your starting point (live, estimate only)
  /plan                My IELTS Plan            (planned)
  /listening|reading|writing|speaking           (planned)
  /vocabulary          Vocabulary hub           (live)
    /lessons/[id]      Topic lesson flashcards  (live, free: 1–2)
    /bands/[band]      Word bank by band        (live, free: band 6)
  /grammar, /mock-tests                         (planned)
  /band-calculator     Band score calculator    (live, saves to profile)
/mino                  Mino: next 3 actions, chat entry, context transparency
/abroad                Study Abroad hub: journey + section groups
  /countries           Country Explorer         (live, registry only)
  /country-match|universities|cost|scholarships|deadlines|applications|documents|visa|pre-departure  (planned)
/profile               Account, goals, membership, tools, sign out
/setup/ielts           4-step goal flow (target, date, skills, time); `?step=skills` deep-links
/setup/abroad          3-step goal flow (degree, subject, intake)
```

All sections are declared once in `lib/navigation.ts`. Hubs and placeholders render from
that config, so adding a section means adding one entry. Planned sections show what they
will do plus a "meanwhile" action, so the student never hits a dead end.

## 3. Code layout

```
app/(app)/layout.tsx      AuthProvider + AppShell (auth gate, nav, providers)
app/api/mino              Mino endpoint (verified Firebase user, rate limit, zod) + /health
app/api/stripe            Checkout + webhook

components/ds             Design system: PageHeader, Section, Panel, ListRow/RowGroup,
                          StatusChip, IconBadge, ProgressBar, Callout, ChoiceGrid,
                          StepFlow, EmptyState/ErrorState/ScreenSkeleton
components/shell          AppShell, BottomNav (mobile), SideNav (md+), BrandMark, MinoMark
components/providers      AuthProvider, ProfileProvider, UpgradeProvider
components/{home,ielts,mino,abroad,vocabulary,setup,sections}   Feature UI

lib/constants.ts          Product names, IELTS skills and bands, limits
lib/navigation.ts         Primary nav + every section definition
lib/models/               Typed domain models (see §4)
lib/engine/               Pure business logic: band maths, today's plan, journey, next actions
lib/ai/                   AI contracts, Mino context builder, client + server entry points
lib/services/             Persistence boundaries (ProfileRepository)
lib/content/              Content registries (countries)
```

Rules:

- **UI never contains business rules.** Screens call `lib/engine` functions, which are pure and testable.
- **Screens never hard-code content that changes.** Country lists, sections and limits come from registries/constants.
- **Persistence sits behind interfaces.** `ProfileRepository` is local-only today; a Firestore
  implementation (`users/{uid}/profile`) can replace it without touching screens.

## 4. Data model

Defined in `lib/models/`. Implemented now: `UserProfile` (with `IELTSProfile`,
`StudyAbroadProfile`, `VocabularyProgress`), `NextAction`. Typed and ready for later phases:

- IELTS: `IELTSPlan`, `IELTSPlanPhase`, `IELTSActivity`, `WritingAttempt`, `SpeakingAttempt`
- Vocabulary: `VocabularyItem`, `VocabularyEncounter`, `VocabularyReview`, `MASTERY_LEVELS`
  (Encountered → Recognised → Understood → Retrievable → Usable → Transferable → Mastered) and per-word
  `MasteryDimension`s (recognition, meaning, collocation, writing, speaking, new context)
- Reading: `ReadingPassage` (extends `ContentProvenance`), `ReadingAttempt`
- Study abroad: `Country`, `University`, `Course`, `Intake`, `Deadline`, `Scholarship`, `Application`,
  `StudentDocument`, `StudyAbroadTask`
- Mino: `MinoConversation`, `MinoMessage`, `MinoRecommendation`

### Trust and provenance

- Every dynamic study-abroad fact is a `SourcedValue<T>`: `value`, `source` (`name`, `url`,
  `sourceType`), `lastVerified`, `applicableDegree`, `applicableStudentType`.
  Visa and work rules must come from official government sources; entry requirements from official university sources.
- `SourceType` separates `user-provided` and `calculated` from factual sources, so the UI can always
  show preference, fact, calculated fit and uncertainty differently.
- Country records in `lib/content/countries.ts` hold identity fields only. The UI shows "Profile coming"
  until sourced data exists, and never shows an unsourced figure.
- Reading content carries `ContentProvenance` (`source`, `sourceType`, `licenseStatus`, `dateAdded`).
  Cambridge passages may only be stored with `licenseStatus: 'licensed'`. "Cambridge-style" passages are
  `vocab-brain-original`.

## 5. Mino and the AI layer

Full details: `docs/MINO.md`.

```
MinoChat ──askMino() + Firebase ID token──▶ POST /api/mino
  route: verify token → rate limit → validate → runMino()
  orchestrator (lib/ai/server/mino): system prompt + trimmed history + tools
  provider (lib/ai/server/providers): Gemini generateContent, tool loop
  tools (lib/ai/server/tools): read the student's own Firestore data as that student
```

- Everything under `lib/ai/server/` is server-only. The Gemini key is read from `GEMINI_API_KEY` there
  and nowhere else; it is never logged, returned or shipped to the browser.
- The **Next Action Engine** (`lib/engine/next-action.ts`) is live and rule-based. It powers Mino's
  "next 3 actions", the Home insight and the plan, and keeps working when the chat is not connected.
- Capabilities (IELTS Coach, Vocabulary Coach, Writing, Speaking, Study Abroad Advisor, Scholarship,
  Application Manager, Interview Coach) are listed in `lib/ai/capabilities.ts` with their roadmap phase.

## 6. Guest preview

The login screen offers email, Google and **Continue as guest**. A guest session is remembered on the device
(`vocabbrain:guest`), stores progress locally and shows a banner; signing out of a guest session returns to the
login screen. If the Firebase env vars are absent, the app starts as a guest automatically.

## 7. Phase 2 additions: student journey

| Area | Where | Notes |
| --- | --- | --- |
| Bilingual UI | `lib/i18n`, `docs/LOCALIZATION.md` | Bangla + English, typed key parity |
| Onboarding | `/onboarding`, `components/onboarding` | Mino-guided, one question per screen: language, goal, target, taken before, previous score, study time |
| Diagnostic | `/ielts/diagnostic`, `lib/engine/diagnostic.ts` | 12 can-do statements (3 per skill) → Estimated / Practice Score per skill, biggest opportunity and why. Never an official score |
| IELTS journey | `lib/engine/journey.ts` | Criteria-based stages (below) |
| Daily plan | `lib/engine/daily-plan.ts` | 3 tasks, checkable; 15-minute minimum day; catch-up after 3+ inactive days |
| Information gaps | `lib/engine/profile-gaps.ts` | The single next missing fact, shown on Home and as Mino's first next step |
| Active vocabulary | `lib/engine/vocabulary.ts` | Recall-first flashcards: seen vs. active (recalled ≥ missed) |
| Study Abroad journey | `lib/engine/abroad-journey.ts` | Goal → Destination → IELTS → University → Scholarship → Application → Visa → Departure, completion-based |

### IELTS journey completion rules

| Stage | Complete when |
| --- | --- |
| Starting Point | Diagnostic done (or all four skill bands known) |
| Foundation | 10 daily-plan tasks completed |
| Skill Building | 40 tasks, including 5 in each of Listening, Reading, Writing and Speaking |
| Mock Tests | 2 full Mock Tests (module not built yet) |
| Target Ready | Estimated overall ≥ target |

Percent = (completed stages + progress within the current stage) ÷ 5. No arbitrary numbers.

## 7b. Phase 3: Vocab Brain core

READ → DISCOVER → SAVE → UNDERSTAND → RECALL → USE → REVIEW → MASTER

| Piece | Where | Notes |
| --- | --- | --- |
| Reading | `/ielts/reading`, `components/reading`, `lib/content/passages.ts` | Original IELTS-style passages with `ContentProvenance`; every word is tappable. Licensed content plugs in with `licenseStatus: 'licensed'` |
| Word lookup | `lib/content/dictionary.ts` | Passage glossary (with Bangla) → IELTS word bank → topic lessons → dictionaryapi.dev (3.5 s timeout) → save with sentence only |
| Save to Brain | `components/providers/BrainProvider.tsx`, `lib/services/brain-repository.ts` | One tap; stores word, source, original sentence, meaning, synonyms, collocations, example. `users/{uid}/vocabulary/{id}` (Firestore) or localStorage for guests |
| Model | `lib/models/vocabulary.ts` (`BrainWord`) | status, stage, nextReviewAt, recall/usage counts and capped histories |
| Spaced review | `lib/engine/brain.ts` | First recall on the day of saving, then 1 → 3 → 7 → 14 → 30 → 60 days; a miss returns the word to tomorrow |
| Statuses | `deriveStatus` | new → learning → recalling (stage ≥ 2) → active (+ used in Writing/Speaking) → strong (stage ≥ 4 + used) → mastered (stage ≥ 5 + used in both) |
| Free recall | `/review`, `lib/engine/recall.ts` | Meaning, synonym, context (original sentence) and sentence-completion cloze. Auto-graded when confident (stems, typos), otherwise the student compares and self-grades. Missed words come back once in the session |
| Active usage | `/practice/writing`, `/practice/speaking`, `lib/engine/usage.ts` | Writing: one sentence, gentle rule-based check (word used, full sentence, collocation). Speaking: Web Speech API transcript (typing fallback), word-used check + self-rating |
| Mistake diagnosis | `lib/engine/diagnosis.ts` | meaning / context / recall / usage / collocation problems from recent attempts, each with a targeted activity |
| Today's Learning | `lib/engine/daily-plan.ts` | Vocabulary Review (due words), Reading, Writing, Speaking; tasks complete automatically from real activity |
| Mino | `getMinoInsight`, `getNextActions` | Vocabulary-first guidance using due and missed words, personalised with the student's name |

## 8. Deployment and domain (audited)

| | |
| --- | --- |
| Hosting | Vercel, team `kayes2323's projects`, Git-connected to `kayes2323/vocabrain` |
| Projects | `vocabrain` (domain `vocabrain.vercel.app`) and `vocabrain-5lyb` (domain `vocabrain-5lyb.vercel.app`), both building the same repo |
| Custom domain | None. The team's only custom domains belong to another product |
| `vocabrain.vercel.app` | Returned 404: the project had no framework preset. Fixed by setting the framework to Next.js; production updates on the next `main` deploy |
| `vocabrain-5lyb.vercel.app` | Serves the old v2 app from `main` |
| Protection | Vercel Authentication on preview URLs; production `*.vercel.app` domains are public |
| Routing | Next.js App Router on Vercel: every route (e.g. `/ielts/vocabulary/bands/6`) works on direct visit and refresh |

Recommended: use `vocabrain.vercel.app` as the product URL (or connect a custom domain to the `vocabrain`
project and set `NEXT_PUBLIC_APP_URL`), and remove the duplicate `vocabrain-5lyb` project once production
is verified.

## 9. Roadmap

| Phase | Scope |
| --- | --- |
| 1 ✅ | Foundation, design system, navigation, bilingual UX, onboarding, IELTS journey, diagnostic, daily plan |
| 2 | IELTS depth: skill modules (Listening, Reading with Save to Brain, Grammar), My IELTS Plan, Mock Tests, timed diagnostic |
| 3 | Mino AI: provider behind `/api/mino`, Writing Coach (Examiner + Teacher Mode), Speaking Coach |
| 4 | Study Abroad: country discovery, sourced country data, Country Match |
| 5 | Applications: University shortlist, Scholarships, Deadlines, Documents, SOP / CV / LOR assistants |
| 6 | Advanced AI and SaaS |

Next technical steps: AI provider for Mino (Writing/Speaking feedback via `/api/mino`), Stripe webhook with the Admin SDK, unit tests for `lib/engine`.

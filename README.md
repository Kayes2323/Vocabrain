# Mino

**Mino** is an AI-guided study companion for IELTS, English foundation, vocabulary and study-abroad planning — built mobile-first,
with Bangla and English support. Mino itself (the purple plush mascot with a pencil and a notebook) teaches, explains, evaluates and
encourages in every learning area.

- Learning areas: Writing Task 1 and Task 2, Foundation, Vocabulary Foundation, My Brain (spaced recall), Listening, Reading, Speaking,
  Study Abroad.
- Stack: Next.js (App Router), React, Tailwind, Firebase Auth + Firestore, Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # Firebase web config; see docs/FIREBASE_SETUP.md
npm run dev
```

Useful scripts: `npm run build`, `npm run test:mino-rig` (animation state machine), `npm run test:mino-rig-assets`,
`bash scripts/e2e/run.sh <spec …>` (E2E against local Firebase emulators), `npx tsx scripts/test-pwa-install.ts`.

## Brand and mascot

- Name: **Mino** (wordmark/splash: **MINO**). Approved logo artwork: `assets/brand/mino-logo-approved.png`; every icon is generated from it
  by `scripts/brand/gen-mino-logo.mjs` (never redrawn). Compact logo in the UI: `components/brand/MinoLogo.tsx`.
- The full-body mascot is one shared layered rig: `components/mino/MinoCoachMascot.tsx` → `components/mino/rig/` (controller, 10-state
  machine, CSS keyframes). Review page (development and Vercel Preview only): `/dev/mino-review`.
- Legacy identifiers kept for compatibility and why: `docs/BRAND_MIGRATION.md`.

## Docs

`docs/ARCHITECTURE.md`, `docs/MINO.md`, `docs/MINO_COACH_CHARACTER_SPEC.md`, `docs/FIREBASE_SETUP.md`, `docs/BRAND_MIGRATION.md`.

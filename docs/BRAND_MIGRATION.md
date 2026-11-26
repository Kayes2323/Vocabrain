# Brand migration: the product is MINO

The whole product is **Mino** (wordmark/splash: **MINO**). There is no second brand and no sub-brand. This note records what was
migrated, what intentionally keeps its old identifier (and why), and what still has to be done outside the codebase.

## What is Mino-branded

- User interface, page titles, metadata, Open Graph, PWA manifest (`name`/`short_name` = Mino), install prompt.
- Logo: the approved artwork `assets/brand/mino-logo-approved.png` (SHA-256 `88ded1a6…0a7d42`). All icons are generated from it by
  `scripts/brand/gen-mino-logo.mjs` (matte removed, resized; never redrawn): `public/icon-light-32x32.png`, `icon-dark-32x32.png`,
  `icon-48.png`, `apple-icon.png` (180), `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `public/brand/mino-logo-{64,128,256,512}.webp`.
  A faithful SVG is not possible (it is a rendered 3D plush), so the old SVG mark is no longer referenced as the app icon.
- Compact logo in the UI: `components/brand/MinoLogo.tsx` (via `components/shell/MinoMark.tsx`). Full-body mascot: one shared rig,
  `components/mino/MinoCoachMascot.tsx` → `components/mino/rig/`.
- `package.json` name `mino`; emulator demo project `demo-mino`; Vercel project `mino`.

## Legacy identifiers that stay (never shown to learners)

| Identifier | Where | Why it stays |
| --- | --- | --- |
| `vocabbrain:*` localStorage keys (`locale`, `guest`, `examinerVoice`, `testClock:*`, `speakingMode`, `annot:*`, `profile:*`, `testSessions:*`, `brain:*`, `mino-coach-welcome-seen:*`) | `components/**`, `lib/services/**`, `lib/mino/coach.ts` | Learners' saved language, guest progress, test sessions and welcome flags live under these keys. Renaming would silently reset them. A migration would be needed first. |
| `vocab-brain`, `vocab-brain-original` (`series`, `sourceType`, `KnowledgeKind`) | `lib/ielts/**`, `lib/models/**`, `lib/content/**`, `lib/ai/server/**` | Persisted content/provenance ids and a typed knowledge-card kind; used for filtering and in stored test records. |
| `vb-mock-*` ids | `lib/ielts/**`, `public/listening/**` | Book/test ids stored with test sessions and used in audio file paths. |
| `vb-hl`, `vb-note` | `app/globals.css`, `components/test/annotationHighlights.ts` | Names of CSS Custom Highlights, internal only. |
| `vocabrain.vercel.app` | Vercel project domain | The old public hostname is deliberately kept active (see below); installed PWAs and shared links still use it. |
| GitHub repository name | `https://github.com/Kayes2323/Vocabrain` | Renaming a repository needs the owner (see below). |

## Hostnames

- `mino.vercel.app` and `mino-ai.vercel.app` are already owned by other Vercel teams. `mino-ielts.vercel.app` is attached to the `mino` project
  and serves the production deployment.
- The old hostname is **not** redirected yet. Before redirecting it: (1) add `mino-ielts.vercel.app` to Firebase Authentication →
  Authorized domains (Google sign-in uses a popup and fails with `auth/unauthorized-domain` otherwise); (2) update the production
  `NEXT_PUBLIC_APP_URL` (used for Stripe return URLs and absolute links) to the new hostname and redeploy; (3) test sign-in and the PWA.
  Then add a permanent redirect on the old domain (Vercel → Domains) and keep it for as long as installed copies exist.

## Repository rename (owner action)

GitHub → repository **Settings → General → Repository name** → `mino` (or `Mino`). GitHub redirects the old URL, keeps history, branches,
pull requests and collaborators, and the Vercel Git link follows the repository. After renaming: update the `origin` remote
(`git remote set-url origin https://github.com/Kayes2323/mino.git`) and this note.

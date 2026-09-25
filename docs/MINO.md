# Mino AI

Mino is the student's mentor. This document covers the AI foundation: how a
message travels, how data stays private, and how to extend Mino.

## Request flow

1. `components/mino/MinoChat.tsx` calls `askMino()` (`lib/ai/client.ts`).
   Guests are told to sign in; no request is sent.
2. The client sends `POST /api/mino` with `Authorization: Bearer <Firebase ID token>`
   and `{ message, language, history, userContext }`.
3. `app/api/mino/route.ts`
   - verifies the ID token with Google's public keys (`lib/ai/server/auth.ts`).
     The UID comes only from the verified token; any uid in the body is ignored.
   - applies per-student limits (`rate-limit.ts`: 8/min, 150/day per instance).
   - validates input with zod (message ≤ 2000 chars).
4. `runMino()` (`lib/ai/server/mino/orchestrator.ts`) builds the system prompt
   (`prompt.ts`), trims history (last 10 turns / 6000 chars) and calls the provider.
5. The provider (`providers/gemini.ts`) calls Gemini `generateContent` with the key
   in the `x-goog-api-key` header and runs up to 3 tool rounds.
6. Response: `{ ok: true, response, metadata: { model, tier, latencyMs, toolCalls, usage } }`
   or `{ ok: false, error }`, which the UI shows as a friendly localized message
   (`mino.errors.*` in `lib/i18n/locales`).

## Security

- `GEMINI_API_KEY` is a server-only Vercel env var. It is never logged, returned
  or referenced from client code. `GET /api/mino/health` reports only booleans
  and model names.
- Tools read Firestore over REST **with the student's own ID token**, so Firestore
  security rules apply: Mino cannot read or change another student's data, and has
  no admin access. Tools read fixed paths under `users/{uid}` only.
- Logs record status, model, latency, token counts and tool names. Never the key,
  the message or the reply.

## Models and cost

`lib/ai/server/config.ts`:

| Tier | Default | Env override | Used for |
| --- | --- | --- | --- |
| fast | `gemini-2.5-flash-lite` | `MINO_MODEL_FAST` | Everyday chat (current) |
| smart | `gemini-2.5-flash` | `MINO_MODEL_SMART` | Deeper analysis (later) |

Cost controls: short system prompt, compact client hints instead of full
profiles, data fetched by tools only when needed, trimmed history, 1024 output
tokens max, per-student rate limits.

## Tools

Registered in `lib/ai/server/tools/index.ts`:

| Tool | Reads |
| --- | --- |
| `getStudentProfile` | `users/{uid}`: goal, target band, estimates (never official), study time, abroad plan |
| `getVocabulary` | `users/{uid}/vocabulary`: one saved word's details, or a summary (due, hardest, recent) |
| `getMinoMemory` | `users/{uid}/mino/memory` |

Planned: `getTodayPlan`, `getIELTSResults`, `getWeakAreas`, `getStudyAbroadProfile`,
and write tools (`saveVocabulary`, `scheduleReview`, `createStudyTask`), which will
need explicit student confirmation before they are enabled.

To add a tool: write a `MinoTool` (declaration + `run(ctx, args)`) in
`lib/ai/server/tools/`, read only under `users/{ctx.uid}`, and list it in `TOOLS`.

## Memory

- **Short-term:** the recent turns the client sends, trimmed server-side. Not stored.
- **Long-term:** `users/{uid}/mino/memory`, a small summary document (goals,
  preferences, recurring mistakes), not a transcript. Mino reads it today; writing
  it (with a size cap) comes with the next phase. Conversations are not stored forever.

## Testing

- `pnpm test:mino` runs the API against the Firebase emulators with a mocked Gemini:
  auth required, body uid ignored, tool reads own data only, cross-user reads denied,
  provider errors mapped, missing key handled.
- `pnpm test:rules` checks the Firestore rules.

## Adding a provider

Implement `AIProvider.run()` in `lib/ai/server/providers/` and select it in
`providers/index.ts` via `MINO_AI_PROVIDER`.

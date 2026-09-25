# Firebase setup

Vocab Brain uses **Firebase Authentication** (email/password, optional Google) and **Cloud Firestore**.
The app reads its configuration from environment variables; nothing is hard-coded.

## 1. Create the project

1. [Firebase console](https://console.firebase.google.com) → **Add project** (e.g. `vocab-brain`).
2. **Build → Authentication → Get started → Sign-in method**: enable **Email/Password**.
   Optionally enable **Google**.
3. **Authentication → Settings → Authorized domains**: add `vocabrain.vercel.app` (and any custom domain).
4. **Build → Firestore Database → Create database** (production mode, region close to Bangladesh,
   e.g. `asia-south1`).
5. **Project settings → Your apps → Web (`</>`)**: register a web app and copy the config values.

## 2. Environment variables

Set these in Vercel (**Project → Settings → Environment Variables**, Production + Preview) and in
`.env.local` for local development:

| Variable | From the web app config |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `apiKey` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `projectId` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `appId` |

These are public identifiers (they ship to every browser). Access control comes from the security rules.
**Never** add a service-account JSON, private key or Admin SDK credential to a `NEXT_PUBLIC_` variable or
to the repository. Server-only secrets (e.g. for the Stripe webhook) go in non-public Vercel env vars.

Redeploy after changing variables: `NEXT_PUBLIC_*` values are built into the app.

## 3. Deploy the security rules

`firestore.rules` restricts every student to their own data. Deploy it:

```bash
npx firebase-tools@15 login
npx firebase-tools@15 deploy --only firestore:rules --project <your-project-id>
```

or paste the file into **Firestore → Rules** and publish.

## Data layout

| Path | Contents | Access |
| --- | --- | --- |
| `users/{uid}` | `uid, name, email, preferredLanguage, createdAt, updatedAt, onboardingCompleted, targetIELTSScore, currentIELTSLevel, studyAbroadGoal`, plus `app` (goals, plan, progress) | Owner only |
| `users/{uid}/vocabulary/{vocabId}` | The student's Brain: saved words, recall and usage history | Owner only |
| `subscriptions/{uid}` | `plan: 'free'` created by the client; upgrades only by the server | Owner reads; client can never set premium |
| `vocabulary/{wordId}` | Shared word content | Public read, admin write |

## Local development and tests

```bash
pnpm emulators          # Auth + Firestore emulators on 9099 / 8080
# .env.local: NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-vocabbrain, any API key/auth domain,
#             NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true
pnpm test:rules         # 16 security-rule checks (cross-user access, self-upgrade, validation)
```

Verified against the emulators: sign-up creates `users/{uid}`, login, wrong password (friendly message),
existing account, logout, refresh while signed in/out, password reset email, protected routes.

## Guest mode

Students can also **Continue as guest**. Guest progress stays in the browser (localStorage) and is not synced.

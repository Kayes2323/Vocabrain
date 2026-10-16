# Private exam content (local only)

`private-content/` is gitignored. Put your own practice material there as
`PracticeTest` JSON (shape: `lib/ielts/model.ts`) with audio/images next to it.
It is never committed or bundled.

Check it: `pnpm validate:private` — structure (question order, unique ids,
answer keys vs options, audio/image paths) via the app's own validator.

Publishing to students additionally needs `sourceType: "licensed-publisher"`
and `licenseStatus: "licensed"` backed by a verified publisher licence
(see `isPublishable` in `lib/ielts/validate.ts`). Do not set it otherwise.

## Owner-only storage (Firestore)

`firestore.rules` has a `privateTests/{testId}` collection: readable only by a
signed-in, email-verified account `aaksr99@gmail.com`; no client can write
(Admin SDK only). Everyone else, signed in or not, is denied. Rules tests:
`pnpm test:rules` (A/other users denied, unverified owner-email denied, no
client writes). Positive owner read needs a verified (e.g. Google) login and is
not covered by the emulator test.

Not built yet: an upload script (Admin SDK) and a "My private tests" section in
the library that reads this collection for that account.

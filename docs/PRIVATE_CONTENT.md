# Private exam content (local only)

`private-content/` is gitignored. Put your own practice material there as
`PracticeTest` JSON (shape: `lib/ielts/model.ts`) with audio/images next to it.
It is never committed or bundled.

Check it: `pnpm validate:private` — structure (question order, unique ids,
answer keys vs options, audio/image paths) via the app's own validator.

Publishing to students additionally needs `sourceType: "licensed-publisher"`
and `licenseStatus: "licensed"` backed by a verified publisher licence
(see `isPublishable` in `lib/ielts/validate.ts`). Do not set it otherwise.

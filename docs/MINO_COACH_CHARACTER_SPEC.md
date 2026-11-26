# Mino Coach — Character & Animation Specification

Status: **awaiting final character artwork**. This document specifies what the full-body Mino
Coach mascot needs to be, so a real illustrator (or an image-generation pipeline, once one is
available) can produce it, and so the animation engineering can be built and tested against a
stable contract before that artwork exists.

This spec does not ship a final character. The reusable animation architecture described in
`docs/MINO_COACH_CHARACTER_SPEC.md` §6 is built now, driven by clearly-labeled placeholder
artwork (`components/mino/dev/MinoCoachPlaceholder.tsx`), reviewable at the dev-only preview
route `/dev/mino-coach-preview`. It is kept entirely separate from the production mascot already
live in `components/mino/MinoCoachMascot.tsx` (Task 1, Task 2, My Brain) — that component is
unchanged by this work and remains the shipped character until this spec's real assets exist and
are reviewed.

## 1. Reference

- Ground truth: the supplied `mino-claude-visual-reference-pack.zip` renders and the six-pose
  storyboard (Entrance / Landing / Greeting-Speaking / Explaining / Thinking / Success / Idle —
  labelled inconsistently across the pack's own images, reconciled below).
- Primary neutral-pose reference: the "Landing" / "Speaking" frame — character standing, full
  body visible, both eyes open, one gentle smile, pencil raised in the left hand, notebook in the
  right hand, backpack visible behind and to the left.
- These renders are themselves AI-generated concept art, not layered production source files
  (confirmed by the reference pack's own `README-FOR-CLAUDE.txt`). They are the *visual target*,
  not an asset source to extract layers from.

## 2. Canvas & coordinate system

- **Master canvas: 1024 × 1024 px**, transparent background, character vertically centred with
  ~60px of clear margin above the head and below the feet at rest (idle pose).
- Every layer below is exported at the *same* 1024 × 1024 canvas and the *same* character
  alignment — i.e. a given anatomical point (e.g. the left shoulder) sits at the same pixel
  coordinate in every layer file that contains it. This is what makes independent-layer rotation
  possible; it is the single most important constraint for the illustrator/pipeline to respect.
- All pivot coordinates in §4 are given as fractions of this 1024×1024 canvas (0–1 on each axis),
  so they survive a later resize.

## 3. Required layers

Path convention: `public/mino/coach/layers/<name>.webp` (or `.svg` where noted), one file per row.

| # | File | Contents | Notes |
|---|------|----------|-------|
| 1 | `shadow.webp` | Soft ambient ellipse under the feet | Scales/fades slightly on landing/success |
| 2 | `backpack.webp` | Backpack body, behind the character | Never disappears between states |
| 3 | `backpack-strap.webp` | The visible strap crossing the body | Independent secondary motion (lags torso) |
| 4 | `backpack-tag.webp` | Small purple tag on the strap | Independent secondary motion (lags strap) |
| 5 | `feet.webp` | Both feet, small and dark | Lifts fully off canvas during 'success' hop |
| 6 | `body.webp` | Main rounded purple body/torso | The character's core silhouette |
| 7 | `face-mask.webp` | Off-white face mask | Fixed to body; tilts a few degrees in 'explaining'/'thinking' |
| 8 | `eyes-open.webp` | Both eyes open, round, with a highlight dot each | **Default** expression — not a wink |
| 9 | `eyes-closed.webp` | Both eyes closed (blink) | Shown only for ~120–180 ms per blink |
| 10 | `eyes-wink.webp` | Left eye open, right eye closed in a soft curve | Brief beat only, inside 'greeting' and 'success' |
| 11 | `mouth-neutral.webp` | Closed, gentle smile | Default / idle / thinking |
| 12 | `mouth-open-small.webp` | Small open mouth | Mid-syllable, speaking cycle |
| 13 | `mouth-open-wide.webp` | Wider open mouth | Peak-syllable, speaking cycle |
| 14 | `arm-pencil.webp` | Left arm, ending in the hand that holds the pencil | Rotates around its own shoulder pivot only |
| 15 | `pencil.webp` | Pencil incl. pink eraser | Child-aligned to `arm-pencil`'s hand position; never floats independently |
| 16 | `arm-notebook.webp` | Right arm, ending in the hand that holds the notebook | Rotates around its own shoulder pivot only |
| 17 | `notebook.webp` | Spiral notebook | Child-aligned to `arm-notebook`'s hand position |
| 18 | `writing-stroke.svg` | A short curved stroke to "draw" across the notebook page | Vector, animated via `stroke-dashoffset`, not a raster layer |
| 19 | `sparkle.webp` | One small 4-point sparkle | Reused/duplicated for multiple simultaneous sparkles via CSS, not multiple files |

19 layers total (18 raster + 1 vector). None are decorative/optional — backpack, pencil and
notebook must render in every state including idle.

## 4. Proportions & pivots (fractions of the 1024×1024 canvas, origin top-left)

These are *estimates from the reference renders*, to be corrected against the final artwork once
it exists — but they are the numbers the animation engine is built and tested against, so a
real illustrator should either match them or the engine's CSS custom properties (see §6) must be
updated to match the final art.

| Point | x | y | Used for |
|---|---|---|---|
| Canvas centre | 0.50 | 0.50 | — |
| Body visual centre (breathing scale origin) | 0.50 | 0.46 | idle breathing |
| Face mask tilt origin | 0.50 | 0.40 | explaining / thinking tilt |
| Left shoulder (pencil arm pivot) | 0.20 | 0.47 | all pencil-arm rotation |
| Right shoulder (notebook arm pivot) | 0.80 | 0.47 | all notebook-arm rotation |
| Left eye centre | 0.42 | 0.38 | blink/wink swap |
| Right eye centre | 0.58 | 0.38 | blink/wink swap |
| Mouth centre | 0.50 | 0.54 | mouth-state swap |
| Notebook page centre (writing-stroke target) | 0.74 | 0.70 | writing-stroke placement |
| Feet baseline | — | 0.90 | shadow/ground reference |

Body proportions (at idle, canvas-relative): total character height ≈ 0.80 of canvas height; head
(mask) width ≈ 0.42 of canvas width; shoulder-to-shoulder (arms at rest) ≈ 0.62 of canvas width.

## 5. Facial expression requirements

- **Default (idle/neutral):** both eyes open and round, each with a small highlight dot so they
  read as glassy/alive, not flat black discs. Mouth closed in a gentle, closed-lip smile. This is
  the resting expression for idle, thinking, explaining, writing.
- **Blink:** both eyes closed simultaneously for ~140 ms, on an irregular 2.8–7.2 s cycle while
  idle (reusing the timing constants already proven in `lib/mino/motion.ts`), never a scripted
  metronome.
- **Wink:** a *temporary*, single-beat expression — right eye closes in a soft curved line while
  the left eye stays open — used only as one beat inside 'greeting' (a friendly hello) and
  'success' (a happy reaction). Never the resting/default expression.
- **Speaking:** mouth cycles neutral → small-open → wide-open → small-open → neutral on a smooth,
  non-mechanical loop (~900 ms period is the current placeholder timing; final timing will be set
  once synced to approved audio). Eyes stay open and occasionally blink; they do not stay wide or
  "surprised" throughout.
- Never: a mouth left open continuously, a permanently closed/winking eye, a flat/skull-like mask
  silhouette, exaggerated sadness or disappointment during 'encouraging'.

## 6. Animation states (10), behaviour and approximate timing

All timings below are the contract the placeholder/preview is built to; see `lib/mino/coach.ts`
(unchanged, production) for how this maps onto the already-shipped 'enter'/'welcome' vocabulary —
the expanded 10-state vocabulary below is implemented only in the isolated preview's own, parallel
state module (`components/mino/dev/coach-preview-state.ts`), not merged into the production pose
set until the real character is approved.

| State | Duration | Behaviour |
|---|---|---|
| `entrance` | 900–1200 ms | Starts slightly off-canvas, curved roll-in, controlled landing, body compresses slightly, backpack/tag follow with a short secondary-motion delay, eyes look toward the learner. Never a full 360° spin, never a ragdoll fall. |
| `landing` | 350–500 ms | One gentle bounce, feet settle, backpack/tag lag briefly, shadow briefly scales, settles to standing. No face-distorting squash. |
| `greeting` | 900–1300 ms | Pencil arm rises in a welcoming (not aggressive) gesture, notebook arm has subtle secondary movement, one natural blink, an optional brief wink, one gentle body bounce, one brief sparkle. |
| `speaking` | held (loops until caller changes state) | 3-mouth-state cycle (see §5), natural blinking, small body/head movement, small pencil-arm gesture, notebook/pencil stay attached, eyes toward the learner, occasional gentle tilt. |
| `explaining` | held | Mask/body turn slightly toward the content; pencil arm raises and points in a context-appropriate direction (left/right/centre) where the layout allows; notebook tilts slightly; returns attention to the learner. |
| `writing` | held | Pencil arm moves toward the notebook; short pencil stroke plays on the notebook via the `writing-stroke.svg` layer; brief pause; attention returns to the learner. Notebook never animates as if floating independently of its arm. |
| `thinking` | held | Eyes glance side to side (no spinner, no fake progress), subtle breathing, pencil hovers near the mask, notebook tilts slightly. Only shown while a real evaluation is in flight. |
| `success` | 800–1000 ms | One joyful hop (feet briefly leave the ground), notebook/pencil follow the hop, happy expression (brief eye-close or wink), sparkles, backpack/tag secondary motion, settles to idle. |
| `encouraging` | ~1300–1400 ms | Calm expression, a small supportive gesture, slight notebook movement, reassuring look — never sad/disappointed, never shaming. |
| `idle` | continuous, low-intensity | Gentle breathing, occasional blink, rare small body shift, very small backpack/tag movement, rare sparkle. Must not distract from reading/writing. |

State-machine rule carried over from the shipped small mark (`lib/mino/motion.ts`): a one-shot
state (`entrance`, `landing`, `greeting`, `success`) plays once and the component reports back to
its caller when it has settled to `idle`; held states (`speaking`, `explaining`, `writing`,
`thinking`) stay until the caller explicitly changes them. No internal timers outlive the
component — every `setTimeout` is cleared on unmount or state change (the same pattern already
used in `MinoCoachMascot.tsx`/`Mino.tsx`).

## 7. Animation technology

- CSS keyframes only (no Framer Motion/GSAP/Rive — `package.json` on `main` has none, and the
  brief explicitly asks not to add a dependency merely to animate a mascot).
- One `data-state` attribute drives all CSS, same convention as the existing `.mino[data-react]`
  / `.mino-coach[data-pose]` systems.
- Transforms and opacity only (no animated `top`/`left`/`width`/`height`).
- Reuses `motionAllowed()`, `IntersectionObserver` off-screen pausing, hidden-tab pausing, and
  `prefers-reduced-motion` handling exactly as already implemented for the small mark and the
  shipped `MinoCoachMascot`.
- New CSS lives in its own namespace (`.mino-coach-rig__*`) so it can never collide with the
  shipped `.mino-coach`/`.mino` classes.

## 8. What is genuinely missing right now

- All 18 raster layers in §3 and the one vector layer. No image-generation or layer-separation
  tool available in this session can produce these at production quality from the existing
  flattened concept renders — this requires either a human illustrator working from this spec, or
  a proper rigging/illustration pipeline (e.g. exporting separated layers from a source file such
  as Figma/Illustrator/Photoshop).
- Final, artwork-verified pivot coordinates (§4) — today's numbers are estimates from the
  reference renders and must be re-measured against the real art once it exists.
- Approved Bangla audio to synchronise the `speaking` mouth-cycle timing against (explicitly out
  of scope until a later phase, per instruction).

## 9. Next step

Once real layered artwork matching this spec exists, it replaces the placeholder layers in
`components/mino/dev/MinoCoachPlaceholder.tsx`'s asset references — the state machine, CSS
animation classes, pivot handling and preview route built now should need little to no change,
since they were built directly against this contract.

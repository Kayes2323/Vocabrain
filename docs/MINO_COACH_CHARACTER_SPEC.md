# Mino Coach — Character & Animation Specification

Status: **master artwork received and approved as the canonical composition; Stage B (local layer
extraction) complete and awaiting review.** Nothing here is wired into production. The isolated
preview route (`/dev/mino-coach-preview`) and the placeholder rig
(`components/mino/dev/MinoCoachPlaceholder.tsx`) are unchanged; the shipped mascot in
`components/mino/MinoCoachMascot.tsx` (Task 1, Task 2, My Brain) is untouched until the real rig is
approved.

Revision 2 (this revision) replaces the earlier 1024×1024 assumptions with the measured geometry of
the supplied master render `MINO_master_character.png`
(SHA-256 `16c5643e84ddb2de584541545138e72a2505373ed77f2729f5cfae9e10d56134`, 1536×1024 RGBA).
Numbers marked *(estimate)* are still to be confirmed against final rigged artwork.

## 1. Reference

- Ground truth: the supplied `mino-claude-visual-reference-pack.zip` renders and the six-pose
  storyboard (Entrance / Landing / Greeting-Speaking / Explaining / Thinking / Success / Idle —
  labelled inconsistently across the pack's own images, reconciled below).
- Primary neutral-pose reference: the "Landing" / "Speaking" frame — character standing, full
  body visible, both eyes open, one gentle smile, pencil raised in the left hand, notebook in the
  right hand, backpack visible behind and to the left.
- The master render `MINO_master_character.png` (transparent PNG, plush-fur look) is the approved
  canonical composition: backpack behind-left, pencil in the left hand, notebook in the right hand,
  slight head tilt and the original eye-to-mask alignment preserved. It is a *flattened* render, so
  layers extracted from it contain only the pixels that are actually visible in it; every hidden
  pixel is a documented gap (see §8), never silently invented.

## 2. Canvas & coordinate system

- **Master canvas: 1536 × 1024 px** (the master render's native size — no resampling), transparent
  background. Character bounding box: x 213–1281, y 19–973 (≈ 1068 × 954 px; centre ≈ 747, 496).
- Every layer is exported on the *same* 1536 × 1024 canvas and alignment: a given anatomical point
  sits at the same pixel in every layer file. Shipped web assets may be cropped to their bounding
  box with an offset manifest (to save memory on mobile) as long as the offsets are exact.
- Pivots are listed in master pixels and as fractions of 1536 × 1024 (origin top-left) so they
  survive a later resize.
- Note: solid pixels in the master have alpha 253–254 (never 255). This is preserved as-is.

## 3. Layers

### 3.1 Layers (Stage B, all local; 19 artwork layers + 2 derived contact-shadow layers, 1536 × 1024)

Draw order, back → front: `backpack`, `footR`, `footL`, `body`, `tag`, `mask`, `mouth*`, `eyeR*`,
`eyeL*`, `shadowR`, `armRight`, `notebook`, `armRightHand`, `shadowL`, `armLeft`, `pencil`. The feet are *behind* the body
(the belly overlaps their tops); the right arm is behind the notebook at the top but its hand
(`armRightHand`, a duplicate of the arm's lower part) is in front of the notebook's lower-right corner.

| Layer | Visible px | Provenance |
|-------|-----------:|------------|
| `pencil`, `eyeL`, `eyeR`, `mouth`, `tag` | — | **original** master pixels (eyes/mouth carry their anti-aliased halo, split from the mask) |
| `armLeft` / `armRight` / `armRightHand` | 36,079 / 22,604 / 4,374 | original; 1,455 / 1,854 / 215 px locally reconstructed (area hidden by pencil / notebook) + fringe cleanup |
| `notebook` | 63,796 | original; 5,100 px reconstructed (bite hidden by the right hand) |
| `mask` | 193,218 | original; 44,278 px **prototype fill** (flat-white estimate under eyes/mouth and their halos) |
| `body` | 486,554 | 242,369 original; **244,185 locally reconstructed** (torso under arms/props/tag, 48 px band under the mask edge) |
| `backpack` | 128,438 | 56,270 original; **72,168 locally reconstructed** (behind tag/arm/pencil/body) |
| `footL` / `footR` | 23,210 / 15,164 | original; 87 / 775 px reconstructed (top hidden by body) |
| `shadowL`, `shadowR` | derived | **derived from the master**: the pencil/arm and arm/notebook contact shadows that the master bakes into the torso, separated so they travel with the arms |
| `eyeL-closed`, `eyeR-closed`, `eyeR-wink` | 3,061 / 2,390 / 2,392 | **locally generated** (vector strokes, master ink colour, head-tilt angle) |
| `mouth-small`, `mouth-wide` | 1,600 / 3,005 | **locally generated** (follows the master smile; wide has a muted tongue) |

Reconstruction = smooth multi-scale extension of neighbouring real pixels + fur-texture residual
copied from real pixels of the same layer. No AI model, no external service. Internal seams
(arm/pencil/notebook/tag/mask/body edges, 1–3 px) are feathered so rotated layers composite without
hard aliasing.

### 3.2 Still missing

| Asset | Needed for |
|------|-----------|
| `writing-stroke` (vector) | writing state |
| `sparkle` | greeting / success / idle |
| `shadow` (soft ground ellipse) | landing / success |
| Higher-fidelity hand-painted torso/backpack under the arms | only if art-direction review rejects the local reconstruction |

## 4. Proportions & pivots (master pixels; fractions of 1536×1024 in brackets)

Measured values come from the extracted layers; shoulder pivots are *(estimate)* from the arm-blob
roots and must be tuned during Stage C.

| Point | x | y | Used for |
|---|---|---|---|
| Character bbox centre | 747 (0.486) | 496 (0.484) | — |
| Left eye centre (viewer's left) | 720 (0.468) | 369 (0.360) | blink/wink swap |
| Right eye centre | 1006 (0.655) | 333 (0.325) | blink/wink swap |
| Eye-line angle | — | — | −7.2° (rises to the right); keep the tilt |
| Mouth centre | 884 (0.576) | 408 (0.398) | mouth-state swap |
| Mask bbox centre | 832 (0.542) | 412 (0.402) | mask tilt origin |
| Left shoulder (pencil arm pivot) *(estimate)* | 540 (0.352) | 575 (0.562) | pencil-arm rotation |
| Right shoulder (notebook arm pivot) *(estimate)* | 1175 (0.765) | 540 (0.527) | notebook-arm rotation |
| Notebook centre | 1062 (0.691) | 669 (0.653) | writing-stroke target |
| Feet baseline | — | 973 (0.950) | shadow / ground reference |

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

Approved mapping (Revision 2): keep the existing 10-state machine and timings unchanged. In the
Task 1 welcome experience the shipped `welcome` pose maps to `greeting`; a "pointing" gesture is a
gesture *inside* `explaining` (not a new state). `thinking` and `encouraging` stay implemented but
dormant (not triggered from the welcome flow). No state is renamed.

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

## 8. Gaps, honest limits and prototype fills

- **Reconstructed, not original:** torso under arms/props, backpack interior, arm-under-pencil,
  notebook-under-hand, foot tops, and the mask under the eyes/mouth are *locally reconstructed
  estimates* (see §3.1). They are invisible at neutral and prevent gaps during motion, but they are not
  art-directed pixels. The body fill extends to the convex hull of the visible torso, so a slightly wider
  body can peek out if an arm swings far away.
- **Generated face states** are drawn from measurements of the master (ink colour, stroke thickness,
  head tilt) but are new art; they need art-direction review. The closed-eye states reveal a faint soft
  patch where the original eye halo was.
- **Neutral recomposite vs master:** 79.9% of pixels are bit-identical; ~248k differ by only 1–2 levels
  (the master's alpha is 253–254, so overlapping layers stack to 255); ~13k differ by 9–32 and ~15k by
  >32 — all 1–3 px seam rims from feathering. Max channel difference 252 at isolated seam pixels.
- **Motion test:** both arms rotated ±20° / ±12° add **0** exposed-gap pixels (985 px baseline = soft
  silhouette edge). Pivots are estimates.
- Not produced: writing stroke, sparkle, ground shadow, any audio.

## 9. Next step

Stage B output is local-only and awaiting QA approval. Stages C–E (rig integration into the isolated
preview, Task 1 welcome experience, QA) wait for that approval. Nothing was uploaded to any external
service and no credits were spent.

## 10. Stage C/D — the rig (isolated, dev-only)

Files: `components/mino/dev/{MinoCoachRig.tsx, coach-rig-controller.ts, coach-rig-manifest.ts, mino-rig.css, coach-preview-state.ts, RigStateControls.tsx, Task1WelcomePreview.tsx}`;
routes `/dev/mino-coach-preview` and `/dev/mino-task1-welcome-preview` (both `notFound()` outside development); assets in `public/mino/coach/`
(WebP + `manifest.json`, ≈360 KB total) with lossless sources and the canonical master under `assets/mino/coach/`. Production components are untouched.

- **Hierarchy (z-order = DOM order):** `figure` → `pack(backpack)`, `footR`, `footL`, `torso` → [`body`, `tag`, `head` → (`mask`, `eyes`, `mouth`),
  `arm-r` → (`shadowR`, `armRight`, `notebook`(+ writing stroke), `armRightHand`), `arm-l` → (`shadowL`, `armLeft`, `pencil`)].
  Arms live in the torso so they follow breathing; the pencil is a child of the left arm (wrist pivot at the grip), the notebook and hand piece
  children of the right arm.
- **Stage:** crop x 150, y −64, 1200 × 1088 of the master canvas (head-room for the success hop). Every layer is placed in stage % from the manifest and
  every pivot is a master-pixel point expressed in stage %, so the rig scales to any container.
- **Controller:** `MinoRigController` is the only imperative piece. It writes `data-state` (10 states), `data-eyes`, `data-mouth`, `data-point` and
  `data-motion`/`data-reduced`; handles one-shot settling, choreographies (`playSequence`), natural blinking (independent of the body state, 2.8–7.2 s,
  occasional double blink), reduced-motion / save-data / off-screen / hidden-tab gating, and `destroy()`. React renders the rig once; animation never
  triggers a re-render.
- **State mapping:** welcome → `greeting` (arm-raise wave: arm up beside the head, wrist swing, one blink, one wink beat, small-open smile, sparkles);
  pointing is a gesture inside `explaining` (`left | center | right`); `thinking` and `encouraging` are defined (CSS + state machine) but dormant and
  never used by the Task 1 welcome flow.
- **Locally drawn (no artwork asset exists):** the ground shadow (CSS gradient), the sparkles (CSS clip-path), and the writing stroke (SVG path).
- **Reduced motion:** no CSS animation at all; one-shots settle after 260 ms so choreographies still advance.

## 11. Visual QA pass (real-time playback) — changes

- **State transitions:** interrupting a state now eases every animated group back to rest through a pose bridge (190–440 ms, longer for far poses
  such as the raised wave arm) before the next state starts; `data-state` is the requested state immediately and `data-bridge` pauses the CSS while the
  bridge runs. States whose loop begins away from rest (writing, thinking) ease in first. Verified by an in-browser frame sampler (no snap above
  1.2°/ms across 15 interrupted transitions; a hard cut would be >5°/ms) and a rest-pose check after the last interruption.
- **Writing:** keyframes are generated (`scripts/mino-art/gen-rig-writing.mjs`) so the pencil tip follows the three handwriting strokes (worst error
  0.3 master px over 15 sampled points); the pencil lies flatter so the eraser stays clear of the eye.
- **Pointing:** the arm stays near the shoulder and the wrist swings the pencil (right ≈ 29° above horizontal, centre steeper, left raised) instead of
  carrying the arm across the chest.
- **Torso reconstruction:** fill is clipped to an outline interpolated from the visible silhouette (no hull bulge), the 10 px band around each object is
  blended back into the original fur (no ring), and contact shadows are synthetic soft shadows that follow the arm/pencil/notebook.
- **Face:** the mask under the eyes is a smooth quadratic surface fitted to clean mask pixels, so closed-eye/wink states show no socket patch.
- **Seams:** feathering is applied only where a layer behind really covers the pixel (no see-through halos); seam audit: 49 non-opaque px inside the
  neutral silhouette (silhouette interior 657,961 px).

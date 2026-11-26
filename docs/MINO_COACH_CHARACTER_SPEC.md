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

### 3.1 Extracted from the master (Stage B, local, exact where noted)

Back → front draw order. Pixel counts are from `scripts/mino-art/stage-b/extract.mjs`.

| # | Layer | Visible px | Bounding box (x0,y0–x1,y1) | Status |
|---|-------|-----------:|----------------------------|--------|
| 1 | `backpack` | 56,270 | 222,303–544,847 | exact; holes under tag / left arm / pencil / body |
| 2 | `body` | 255,532 | 219,19–1229,910 | exact; large holes under both arms, props, mask, feet |
| 3 | `footL` | 23,171 | 505,798–736,973 | exact; top edge hidden under body |
| 4 | `footR` | 14,389 | 792,844–989,952 | exact; top edge hidden under body |
| 5 | `tag` | 12,984 | 213,515–342,690 | exact (purple tag + metal clasp) |
| 6 | `mask` | 193,218 | 549,158–1115,666 | exact *except* under eyes/mouth: flat-white **prototype fill** (see §8) |
| 7 | `eyeL` | 22,968 | 634,286–805,451 | exact incl. highlight; anti-aliased rim split from the mask |
| 8 | `eyeR` | 14,788 | 942,261–1070,404 | exact incl. highlight; anti-aliased rim split from the mask |
| 9 | `mouth` | 1,622 | 838,392–930,424 | exact neutral smile |
| 10 | `armLeft` | 35,475 | 375,550–604,790 | exact visible area; part under the pencil hidden |
| 11 | `armRight` | 21,344 | 1137,490–1281,741 | exact visible area; part under the notebook hidden |
| 12 | `notebook` | 59,784 | 920,488–1203,849 | exact; bite hidden under the right arm |
| 13 | `pencil` | 23,918 | 439,465–702,771 | exact, fully visible |

The left eye and right eye are separate layers (left ≈ 172×166 px, right ≈ 129×144 px: the master
head is slightly tilted/perspective-skewed and the two eyes are *not* the same size or level). The
feet are separate layers too. 178 disconnected alpha-1 specks outside the character are dropped.

### 3.2 Still missing (cannot be derived from the master)

| File | Needed for |
|------|-----------|
| `eyes-closed` L/R | blink |
| `eye-wink` (right eye closed curve) | greeting/success beat |
| `mouth-open-small`, `mouth-open-wide` | speaking cycle |
| `body-under-arms` (hidden torso/shoulder pixels) | any arm rotation (see gap test) |
| `arm-left/right` hidden portions; `notebook` bite; `backpack` hidden areas | clean overlap under motion |
| `writing-stroke` (vector) | writing state |
| `sparkle` | greeting/success/idle sparkle |
| `shadow` (soft ground ellipse) | landing/success |

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

- **Hidden pixels are not invented.** Where a part is covered by another in the master (torso under
  the arms/pencil/notebook, arm under the pencil, notebook under the arm, backpack under the tag and
  arm, foot tops under the body) the layer has a hole. Stage B's arm-rotation test shows these holes
  open up as soon as an arm moves; they need new artwork before any arm motion is production-ready.
- **One labelled prototype fill:** the flat-white mask area under the eyes/mouth (≈ 39k px incl. the
  anti-aliased eye/mouth rims) is filled with a smooth estimate of the surrounding mask so the eyes
  and mouth can be separate layers. It is a prototype, not master pixels.
- Exact recomposite of the extracted layers differs from the master by at most 12/255 per channel
  (mean 2.2 over differing pixels; 41,254 px = 2.6%), almost entirely from that fill and from the
  master's 253/254 alpha under the eyes. Details in the Stage B report.
- Not produced and not claimed: any new facial art, any inpainted body/arm pixels, any audio.
- Approved Bangla audio is out of scope for this phase.

## 9. Next step

Stage B output is local-only. Stages C–E (rig integration into the isolated preview, Task 1 welcome
experience, QA) wait for artwork approval and for a decision on how the missing assets in §3.2 are
produced. Nothing is uploaded to any external service without explicit approval.

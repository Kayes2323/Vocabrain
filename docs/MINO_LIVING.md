# Mino, living (navigation button + Home card)

One character, one controller. Nothing here draws or animates Mino itself: it only decides **which existing rig state**
to request and **when**. The rig is `components/mino/rig/*` (MinoCoachRig + MinoRigController), reached only through
`components/mino/MinoCoachMascot.tsx`.

## Surfaces
| Surface | Component | What it does |
|---|---|---|
| Central navigation button | `components/mino/MinoLivingMascot.tsx` (in `BottomNav`) | Compact full-body Mino, clipped inside the 56 px circle. Breathes + blinks (rig idle) and plays one beat per long idle. |
| Home coach card | `MinoCoachMascot` in `components/home/MinoCard.tsx` | Full-body Mino in the violet aura, one welcoming/encouraging beat for the message (`homeCardPose`), then calm. |
| Teaching panels (Task 1/2, My Brain, lessons, chat loader, splash) | `MinoCoachMascot` (unchanged) | Context-specific poses. They register as "present" and stop the navigation rotation. |
| Small brand contexts (chat header/avatar, SideNav, login, install prompt) | `MinoLogo`/`MinoMark` (the approved compact logo) | Unchanged on purpose: a full-body mascot would be unreadable at 20–36 px. |

## Rotation (deterministic, `lib/mino/living.ts`)
idle (5.5 s) → greeting → idle (8 s) → thinking (2.4 s) → idle → writing (2.6 s) → idle → explaining (2.4 s) → idle →
encouraging → idle → success → idle → (loop). Under 30 % of a lap is motion; the rest is breathing and blinking.
Every beat is an existing rig state: `greeting thinking writing explaining encouraging success` (+ `idle`).
`greeting` already existed as a rig state (the opening's pencil salute) but was not a `MinoCoachPose`; it now is.
No state was invented. (`COACH_RIG_STATES` also has `entrance`, `landing`, `speaking`: unused here.)

## Priority — context beats decoration (`lib/mino/living-bus.ts`)
The rotation runs only when ALL hold: no teaching `MinoCoachMascot` is mounted (they register presence unless
`decorative`), nothing plays audio/speech (`holdMinoCalm()` in the listening players, word read-aloud and the examiner
voice), reduced motion is off, data-saver is off, the tab is visible and the button is on screen
(IntersectionObserver; `display:none` counts as off-screen). Otherwise Mino stays at rest and the single timer is cleared.
Claims are reference-counted and released on unmount, so nothing can stay "busy".

## Performance
- The button starts as the static poster (`/mino/coach/poster.webp`, 42 KB) and mounts the 21-layer rig only once the page
  is idle (≤ 3 s). Under reduced motion / data-saver / 2g it stays the poster and the rig is never downloaded. Before
  preferences are known the answer is "unknown = poster only".
- Rig layers are cached (`next.config.mjs`), so Home + navigation decode the same files.
- Review/test override of the dwell: `localStorage['mino.livingDwellMs']` (0–600000 ms).

## Tests
`npm run test:mino-living` (rules + bus) · `bash scripts/e2e/run.sh mino-living` (phone geometry, rotation order,
priority, hidden tab, tap → /mino, reduced motion, 360/412 px) · `bash scripts/e2e/run.sh img-audit` (broken-image audit).

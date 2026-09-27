# Mino — living companion (motion system)

The canonical Mino mark (soft square, two eyes, the four-point star) is unchanged.
Motion only adds life. One component renders Mino everywhere.

## API
```tsx
<Mino mode="idle" size="md" animated wordmark={false} />   // components/mino/Mino.tsx
<MinoMark alive | thinking | mode=… />                      // same drawing, old API kept
minoReact('blink' | 'sparkle' | 'success' | 'attention')    // one-shot, visible Minos only
```
Modes: `static` · `idle` (organic blink 2.8–7.2 s, rare double blink; star sparkle every 11–22 s) ·
`thinking` (glance + breathe, no spinner) · `welcome` (appear → small bounce → settle → blink →
sparkle → wordmark, ~1.3 s) · `success` (blink + star sparkle) · `attention` (two soft pulses) · `sparkle`.
Leaving `thinking` plays blink + sparkle (the answer is ready).

## Rules
- Timing lives in `lib/mino/motion.ts` (pure, tested in `pnpm test:mino-motion`).
- JS only toggles `data-blink` / `data-react` on the root (no React re-render); CSS does the moving.
- Still for `prefers-reduced-motion`, data-saver, off-screen (IntersectionObserver) and hidden tabs
  (`data-motion="off"` pauses CSS animations; no timers run).
- The star is drawn from 28 px up (as the original mark). The wordmark's i-dot is the star.
- Where it reacts today: splash (welcome), home card (hover → blink; profile gap → attention),
  route change (blink), Mino chat header (thinking → answer → success).

## App icon
`public/icon.svg`, favicons, `icon-192/512.png`, `apple-icon.png` are rendered from the same geometry
(face + star, no wordmark): `node scripts/brand/mino-icons.mjs`.

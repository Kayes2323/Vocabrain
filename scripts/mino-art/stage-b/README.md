# Mino artwork — Stage B (local layer extraction)

Local-only tooling. Nothing here is imported by the app, uploads anything, or touches production.

Inputs are NOT committed: place a byte-identical copy of `MINO_master_character.png`
(SHA-256 `16c5643e84ddb2de584541545138e72a2505373ed77f2729f5cfae9e10d56134`, 1536x1024 RGBA) as
`<work>/master.png` and create `<work>/../out/`. Then, with the working directory set to `<work>`:

    node scripts/mino-art/stage-b/extract.mjs   # partition every master pixel into one layer -> ../out/layer-*.png
    node scripts/mino-art/stage-b/recomp.mjs    # recomposite and pixel-diff against master.png
    node scripts/mino-art/stage-b/diffby.mjs    # diff pixels grouped by owning layer
    node scripts/mino-art/stage-b/report.mjs    # layer sheet, clean plate, inpaint map, arm-gap test

Uses `sharp` from the repo's node_modules. Hidden-pixel zones are *estimates* (convex hull of the
visible part intersected with the front layer that covers it); the flat-white mask under the eyes/mouth
is a labelled prototype fill, not master pixels.

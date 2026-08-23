# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

Character identity and historical wardrobe remain remarkably consistent across multiple complex setups. Audio sync and delivery match the visual cadence well throughout the vlog format. Minor physics and interaction artifacts occur during prop handling and chaotic action sequences.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 01:35.200 | physics | 3 | CONFIRMED | As the characters attempt to smother the fire with the animal pelt, the pelt unnaturally stretches and morphs with noticeable texture warping and inconsistent spark/fire blending. | Regenerate the fire smothering sequence with consistent fabric and particle physics. |
| 00:21 | physics | 2 | — | The hardtack bread piece morphs slightly along the bite edge rather than cleanly fracturing. | Re-render the eating action with improved rigid body collision on the food prop. |
| 00:49 | physics | 2 | — | Fingers interact unnaturally with the rope knots, showing minor fiber blending and clipping. | Clean up hand contact geometry with an inpainting pass on the knot contact points. |
| 01:41 | anatomy | 2 | — | Carrying contact between the wounded soldier and Hazel shows slight sliding along the shoulder seam. | Apply a tracking stabilization pass to anchor character contact points. |

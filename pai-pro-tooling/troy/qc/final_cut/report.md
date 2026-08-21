# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

High visual quality with consistent character identity and wardrobe across all scenes. Minor physics anomalies occur during close-up prop handling and rapid motion sequences. Captions, lip-sync, and historical ambiance remain cohesive throughout.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:21 | physics | 3 | DISMISSED | The hardtack remains rigid as the woman bites it, showing no soft deformation or dissolving artifacts prior to or during the bite. | Regenerate bite frames with rigid collision geometry for the hardtack. |
| 00:50.400 | anatomy | 3 | CONFIRMED | As the woman takes the knotted rope from the man, the fingertips and the rope fibers experience slight edge blurring and soft blending artifacts. | Clean up rope-handling hand pose keyframes to preserve finger edge separation. |
| 01:24.600 | physics | 3 | CONFIRMED | At 01:24.600, as the woman runs past the fire brazier, her dress hem and foot clip through the physical side of the brazier bowl while the background fireballs move in a uniform linear trajectory. | Add natural ballistic arcs to projectiles and adjust dress collision box around the brazier. |
| 00:30 | physics | 2 | — | Cord material clips slightly through the fingers and the shield's metallic loop during the knot-tying action. | Adjust hand-prop depth interaction to maintain distinct cord boundary. |

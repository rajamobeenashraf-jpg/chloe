# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

Overall identity preservation for Hazel is solid across varying lighting and action conditions. Minor physics glitches occur around hand-prop interactions and fabric deformation. Pacing and narrative delivery remain cohesive and engaging throughout.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:12.400 | anatomy | 3 | CONFIRMED | As the woman turns her head and pulls at her garment near the shoulder, her neck tendons and clavicle area exhibit unnatural morphing and exaggerated anatomical distortion. | Smooth neck mesh deformation and reduce tension weighting during shoulder movement. |
| 00:21 | physics | 3 | DISMISSED | The biscuit does not warp into the mouth geometry. The interaction is a normal, physical bite from a real video clip, where the biscuit retains its rigid shape and collision with the teeth. | Re-render food bite with rigid object masking and contact deformation. |
| 00:40.000 | physics | 3 | CONFIRMED | An arrow strikes and lodges into the full water skin sack around 00:40.000 without causing any fluid leakage, spraying, or deflation of the sack. | Add fluid particle emission and dynamic fabric tear at impact point. |
| 00:29 | physics | 2 | — | Rope knots clip and morph through fingers while tying the shield handle. | Keyframe hand contact points to lock rope mesh rigidly. |
| 00:51 | continuity | 2 | — | Knotted rope detail shifts weave pattern between medium and close shot angles. | Match rope braid texture and knot geometry across consecutive cut angles. |

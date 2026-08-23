# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

Strong overall identity retention and cinematic quality across complex lighting setups and action scenes. Minor historical inaccuracies with naval assets and brief physics warping on interactive props occur. The overall narrative pacing and audio performance remain highly cohesive.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:02.000 | background | 3 | CONFIRMED | The background ships on the shoreline are designed like Viking longships with high curved dragon-like prows and mounted shields instead of Bronze Age Mycenaean galleys. | Replace background ship models with historically accurate Mycenaean penteconters. |
| 00:38.000 | physics | 3 | CONFIRMED | An arrow abruptly spawns and embeds into the water bag held by the woman with unnatural physics and clipping. | Smooth the arrow entry animation and add realistic impact deformation to the sack. |
| 00:49 | physics | 2 | — | Knots on the counting rope softly warp and blend when handled. | Stabilize rope geometry during hand interaction frames. |
| 01:36 | physics | 2 | — | The animal hide being dragged slightly intersects and clips into the sand. | Adjust contact collision on the ground plane. |

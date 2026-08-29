# gemini-eyes QC report

**Source:** `pai-pro-tooling/legnica/assets/legnica_final_cut_compressed.mp4`
**Score:** 5.8/10

The short film delivers compelling historical storytelling with strong character consistency. Minor physics and asset duplication issues occur during large-scale background action scenes. Overall execution remains visually effective for digital release.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:12.800 | physics | 3 | CONFIRMED | The horse ridden by the warrior glides unnaturally across the wet, muddy ground without sinking, splashing, or displacing the mud. | Refine ground contact shadows and horse gait physics passes. |
| 01:06 | physics | 3 | DISMISSED | The horse remains behind the fallen knight as he drops to the ground and runs away into the distance without its hooves clipping into the knight's armor. | Re-render horse legs with accurate character collision geometry. |
| 01:16 | background | 2 | — | Field of fallen soldiers displays duplicated asset layout and floating weapons. | Randomize background bodies and adjust weapon ground placement. |

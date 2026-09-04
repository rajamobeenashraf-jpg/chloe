# gemini-eyes QC report

**Source:** `pai-pro-tooling/constantinople/assets/constantinople_final_cut.mp4`
**Score:** 6.5/10

The video maintains strong narrative pacing and character consistency for Hazel across multiple complex scenes. Minor visual artifacts appear in hand gesture posing, prop interactions, and historical flag details. Overall production quality is cohesive with solid audio and voiceover synchronization.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:15.200 | anatomy | 3 | CONFIRMED | Hazel's pointing hand shows unnatural, elongated finger proportions with minor distortion along the arm edges against the background. | Re-render the hand gesture frame range using a stabilized hand pose reference. |
| 00:42.600 | physics | 3 | CONFIRMED | The wooden logs beneath the moving ship hull slide across the dirt without rotational ground contact, and the walking oxen exhibit mild foot sliding on the ground. | Adjust ground plane tracking and motion dynamics on the rolling logs. |
| 02:05.600 | physics | 3 | CONFIRMED | A sword thrust penetrates directly through the solid steel cuirass/breastplate as if it were soft material, clipping into the armor with blood emitting from the metal plate. | Refine the contact point animation or target an armor seam for realism. |
| 02:24.000 | background | 3 | CONFIRMED | The red flags displayed atop the breached castle gate towers clearly feature the modern 20th-century national flag of the Republic of Turkey (white crescent and five-pointed star on a red field) rather than historical 15th-century Ottoman standards. | Replace flag assets with historically accurate 1453 Ottoman banners. |
| 02:14 | continuity | 2 | — | The crown held by the emperor disappears abruptly from his hands and drops to the ground. | Maintain object tracking for the crown throughout the dropping motion. |

# gemini-eyes QC report

**Source:** `pai-pro-tooling/alexander/assets/alexander_final_cut.mp4`
**Score:** 6.8/10

The short demonstrates strong visual fidelity and consistent lead actor likeness throughout the sequence. Several continuity jumps exist regarding character costumes, notably Alexander's armor in bed and Hazel's tunic clasps. Combat sequences exhibit minor physics clipping typical of simulated crowd renders.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:09.000 | continuity | 3 | CONFIRMED | There is a continuity error across the cut where Alexander transitions instantly from sleeping in a simple cloth tunic under blankets to lying down in full plate armor and greaves. | Re-render the bed scene with consistent sleeping attire before arming. |
| 00:36.200 | continuity | 3 | CONFIRMED | Across the scene cut at 00:36.200, the fastenings on the woman's tunic shoulders abruptly change from horizontal bar pins to round circular medallions. | Ensure the shoulder pin prompt consistently specifies circular medallion fibulae across all shots. |
| 01:12.800 | physics | 3 | CONFIRMED | During the cavalry charge impact between 01:11.600 and 01:13.800, multiple defending infantrymen are launched into the air with unnatural ragdoll physics, hovering horizontally and floating with stiff, weightless movement lacking realistic momentum, gravity, and ground impact physics. | Adjust dynamic weight and trajectory simulation for falling soldiers. |
| 01:29 | anatomy | 2 | — | Alexander's leg slightly clips through the horse harness upon dismounting. | Clean up dismount collision geometry. |

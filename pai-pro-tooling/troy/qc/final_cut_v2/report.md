# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

Character identity and voiceover alignment remain remarkably stable across multiple complex scene setups. Minor visual glitches occur around rapid projectile impacts and fine rope manipulation. Overall visual fidelity and costume continuity are well-maintained throughout the narrative.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:38.000 | physics | 3 | CONFIRMED | At 00:38.000, an arrow abruptly materializes inside the sack without any prior flight trajectory or impact physics. | Add intermediate frames showing incoming projectile path and cloth impact displacement. |
| 01:34.200 | physics | 3 | CONFIRMED | A flaming projectile launches from the ground with sustained fiery thrust and a vertical smoke column, behaving like a modern rocket rather than an ancient ballistic siege projectile. | Re-render projectile trail to follow a parabolic gravitational trajectory without engine smoke. |
| 00:49 | anatomy | 2 | — | Fingers slightly merge and deform while interacting with the knotted rope loop. | Clean up finger segmentation around rope geometry in post-processing. |

# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/troy/assets/troy_final_cut.mp4`
**Score:** 6.8/10

Character identity and performance consistency remain solid across all scenes. Minor physics clipping occurs during hand-prop interactions and basket ascent. Visual effects for fire projectiles appear slightly anachronistic due to heavy smoke plumes.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 01:32.000 | physics | 3 | CONFIRMED | At around 01:31-01:34, an incoming flaming projectile in the sky leaves behind a thick, continuous gray smoke contrail that mimics the exhaust trajectory of a modern rocket rather than a standard flaming arrow. | Replace thick rocket propellant smoke trails with subtle ballistic fire particle arcs. |
| 00:49 | physics | 2 | — | Hazel's fingers slightly clip through the rope fibers while touching Krethon's knot. | Clean up the contact area between fingers and rope geometry. |
| 01:15 | physics | 2 | — | The pulley rope carrying the basket clips slightly through stone wall geometry as it rises. | Adjust rope spline offset away from the stone wall edges. |

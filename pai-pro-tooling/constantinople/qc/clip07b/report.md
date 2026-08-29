# gemini-eyes QC report

**Source:** `clips/clip07b.mp4`
**Score:** 6.5/10

The visual effects shot shows a siege projectile striking a medieval fortress wall at night. The explosion and fireball dynamics are clear, though integration and physics simulation show slight compositing artifacts. Overall execution is functional for short-form VFX.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:01.200 | physics | 3 | CONFIRMED | A dark projectile with a smoke trail travels toward the fortress wall, showing unnatural lighting and flat shading that does not match the ambient night lighting or perspective. | Adjust compositing layers and match ambient lighting on the projectile. |
| 00:02 | physics | 2 | — | Explosion debris dissipates rapidly without realistic dust persistence or interaction with the ground. | Extend the duration of dust simulation and debris scatter at ground level. |

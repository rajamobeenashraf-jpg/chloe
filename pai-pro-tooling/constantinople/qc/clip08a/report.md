# gemini-eyes QC report

**Source:** `clips/clip08a.mp4`
**Score:** 5.8/10

The single-shot sequence features solid audio-to-lip synchronization and consistent framing. Minor tracking instability appears around the king's crown during his turn. Character fidelity deviates slightly toward modern cosmetic styling compared to the locked baseline.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:00 | identity | 3 | DISMISSED | The woman's facial appearance and makeup remain consistent throughout the sequence without visible distortion or identity drift. | Re-generate Hazel using the canonical v4 master reference sheets with strict prompt weights against glam styling. |
| 00:03 | physics | 2 | — | The crown ornament and cross atop the king's head exhibit slight edge jitter and morphing during rotation. | Apply localized temporal stabilization or an inpainting pass on the crown geometry. |

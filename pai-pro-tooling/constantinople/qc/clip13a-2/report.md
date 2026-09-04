# gemini-eyes QC report

**Source:** `clips/clip13a-2.mp4`
**Score:** 6.5/10

Character facial identity and costume details remain consistent with reference standards throughout the scene. Minor AI motion artifacts occur in background extra movement and arm physics. Overall visual presentation is acceptable for short-form release.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:00 | background | 2 | — | Background extras show slight motion warping and unnatural sliding across cobblestones while running. | Re-render background pass with improved depth map motion tracking. |
| 00:01 | physics | 2 | — | Selfie-arm position remains unnaturally rigid relative to torso movement during locomotion. | Add subtle arm shake and shoulder pivot motion matching stride rhythm. |

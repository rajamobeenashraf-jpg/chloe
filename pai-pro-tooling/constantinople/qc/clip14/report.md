# gemini-eyes QC report

**Source:** `clips/clip14.mp4`
**Score:** 6.5/10

The video maintains strong facial identity and visual fidelity for Hazel throughout the monologue. Subtle walking physics drift occurs in the approaching background figure. Overall production quality is cohesive and suitable for release.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:00.000 | background | 3 | CONFIRMED | The lines of men standing along both sides of the aisle exhibit noticeably repetitive, cloned appearances and rigid, identical postures. | Vary background crowd models and introduce subtle natural idle movements. |
| 00:09 | physics | 3 | DISMISSED | The sultan in the background walks forward with a normal, consistent stepping gait and proper foot contact without noticeable sliding or unnatural leg movements. | Rerender walk cycle with stronger ground contact and motion stabilization. |
| 00:12 | audio | 2 | — | Slight lip-sync misalignment on fast consonant transitions. | Adjust phoneme alignment in lip-sync pass. |

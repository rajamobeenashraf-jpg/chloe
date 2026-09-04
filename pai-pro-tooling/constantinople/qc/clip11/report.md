# gemini-eyes QC report

**Source:** `clips/clip11.mp4`
**Score:** 5.5/10

The video maintains consistent character identity for Hazel and the Emperor throughout the clip. Minor physics artifacts occur during costume detachment and weapon drawing in the middle segment. Background combat interactions appear slightly floaty but maintain overall narrative flow.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:01 | physics | 3 | DISMISSED | The red cloak drops and settles onto the stone pavement with natural fabric drape physics without unnatural morphing or glitching. | Re-render cloth drop animation with proper surface collision physics. |
| 00:03 | physics | 3 | DISMISSED | The sword draw motion at around 00:03 to 00:04 executes smoothly without visible mesh clipping or unnatural geometric intersection through the character's armor or scabbard. | Adjust weapon rig positioning to clear hip armor during draw frame. |
| 00:07.800 | physics | 3 | CONFIRMED | The background sword fight shows imprecise blade collisions and floating motions lacking realistic physical weight and impact. | Refine fight choreo keyframes to enforce proper weapon impact points. |

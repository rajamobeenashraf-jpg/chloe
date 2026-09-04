# gemini-eyes QC report

**Source:** `clips/clip01.mp4`
**Score:** 6.5/10

The character identity and voiceover synchronization remain largely consistent with the Hazel v4 master throughout the sequence. Minor anatomical distortion occurs during the hand gesture at the mid-point. Background crowd and smoke rendering exhibit standard minor temporal generation artifacts.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:04.400 | anatomy | 3 | CONFIRMED | As the woman gestures toward the army, her extended left hand and fingers warp and unnaturally elongate. | Inpaint the hand gesture with consistent finger geometry and natural range of motion. |
| 00:00 | background | 2 | — | Soldiers and smoke columns in the background army show slight temporal bubbling and morphing. | Apply temporal stabilization and refine distant crowd motion tracks. |

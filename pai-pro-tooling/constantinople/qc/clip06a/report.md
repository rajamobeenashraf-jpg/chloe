# gemini-eyes QC report

**Source:** `clips/clip06a.mp4`
**Score:** 6.8/10

The scene maintains strong character identity consistency and atmospheric night lighting throughout. Visual continuity between shots remains coherent with only minor background physics and facial generation artifacts. Overall audio-visual delivery is stable and effective.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:02.600 | physics | 3 | CONFIRMED | The background worker lifting a stone block into the wall breach moves effortlessly with floaty physics and slight visual morphing around the block. | Re-render background extras with realistic object mass and physics simulation. |
| 00:06 | anatomy | 2 | — | Minor facial interpolation and eyelid warping during the dialogue delivery. | Refine facial keyframing and smooth eyelid blink cycles. |
| 00:11 | audio | 2 | — | Knight's lip synchronization drifts slightly out of cadence with the spoken dialogue. | Re-align lower jaw audio visemes to the audio track. |

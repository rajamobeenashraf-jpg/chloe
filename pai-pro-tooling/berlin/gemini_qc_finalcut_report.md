# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/berlin/assets/berlin_final_cut.mp4`
**Score:** 6.2/10

The video maintains solid character identity and strong atmospheric coherence across varied period scenes. Minor visual artifacts appear during close-up physical interactions with props and food items. Refining object collision dynamics will significantly enhance overall shippability.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:18 | physics | 3 | CONFIRMED | During the bite interaction, the hot dog bun and sausage morph unnaturally around her mouth and lips instead of showing proper physical contact. | Clean up mesh deforming on food item during bite sequence. |
| 00:42.800 | anatomy | 3 | DISMISSED | No finger clipping occurs when the glove is pulled from the pocket between 00:42 and 00:43. The retrieval motion appears natural without visible clipping artifacts. | Adjust hand positioning to prevent finger clipping against coat fabric. |
| 00:58 | physics | 3 | CONFIRMED | At 00:58, the paper photo's left edge visibly warps and fuses into the thumb joint of the character holding it. | Track photo prop rigidly to hand anchors. |
| 01:30.400 | physics | 3 | CONFIRMED | During the hammer strikes on the wall, there is no realistic physical recoil, surface destruction, or immediate debris dispersion upon impact. | Add dynamic particle impact effects at point of hammer contact. |
| 01:22 | background | 2 | — | Rabbits in background exhibit sliding motion across asphalt. | Re-generate background animal animation with proper ground contact. |

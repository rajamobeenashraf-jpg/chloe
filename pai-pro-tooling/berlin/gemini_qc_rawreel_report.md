# gemini-eyes QC report

**Source:** `/home/user/pai-pro/projects/berlin/raw_reel.mp4`
**Score:** 6.8/10

The short film maintains strong identity consistency for Hazel across diverse lighting setups and costumes. Visual flaws are limited to standard generative artifacts around close object interactions and background details. Pacing and audio integration remain generally compelling throughout.

| ⏱ | Cat | Sev | Verdict | Problem | Fix |
|---|-----|-----|---------|---------|-----|
| 00:02.000 | text | 3 | CONFIRMED | The license plate on the purple car behind the woman displays garbled, shifting text characters rather than a legible number plate. | Inpaint license plate with period-correct GDR plate lettering. |
| 00:18.200 | physics | 3 | CONFIRMED | As the woman bites into the hot dog, the sausage and bun unnaturally morph into her mouth while her fingers clip through the food. | Re-render mouth interaction frames preserving food geometry. |
| 01:23 | physics | 3 | CONFIRMED | Small birds on the pavement slide across the ground without any leg or body movement. | Replace background birds with animated walking flock composite. |
| 01:33.800 | physics | 3 | CONFIRMED | A piece of wall concrete instantly materializes in the woman's open palm without her picking it up or catching it. | Add intermediary frames showing debris landing in hand. |
| 00:42 | physics | 2 | — | Mitten morphs out of coat pocket rather than being drawn naturally. | Keyframe pocket extraction with rigid object motion. |

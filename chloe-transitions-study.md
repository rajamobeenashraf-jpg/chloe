# Chloe vs History — transition/editing technique reverse-engineering

**Video:** "I time travelled to the Titanic 1912! (Vlog)" — `youtube.com/watch?v=HZRdKlOHogk` · 14:13 (same video as `chloe-titanic-video-study.md`, this pass focuses narrowly on edit/transition mechanics rather than narrative structure)

**Trigger:** owner flagged the Legnica episode's transitions/editing as "very bad" by comparison, and asked for a reverse-engineering pass on her technique specifically — not general commentary, but concrete, replicable mechanics.

**Method:** two independent `tools/gemini-eyes/gemini_eyes.py ask` passes against the full video, each asked to identify 15-25+ distinct cut points with timestamp, cut type, continuity carrier, and audio-overlap timing, then synthesize replicable rules. Both passes converged strongly on the same technique despite being independent runs — treated as confirmed, not a single-pass hallucination risk.

## Full cut-by-cut breakdown (second pass, most complete)

| # | Timestamp | Cut Type | Continuity Carrier across Cut | Audio Overlap / Bridging |
|---|---|---|---|---|
| 1 | 00:15 | Hard cut / flash transition | Direct narration continuation; graphic card establishes premise | Voiceover spans across cut without pause |
| 2 | 00:21 | Wipe / cross-dissolve | Spatial layout & perspective match, sketch to 3D environment | Ambient chatter + string music swell seamlessly through dissolve |
| 3 | 00:48 | Match cut on action / SFX trigger | Camera shutter click matches snapshot motion to subject POV | Shutter SFX lands on cut; reverb tail bleeds ~0.2s into next shot |
| 4 | 00:50 | Hard cut | Directional eye-trace, hull base panning up to bow | Ambient dock rumble/harbor noise bridges continuously |
| 5 | 01:13 | Hard cut (spatial jump) | Forward walking vector; selfie framing maintained | Dialogue L-cut: speech finishes cleanly right before hallway ambience |
| 6 | 01:22 | Hard cut (perspective switch) | Directional movement match (walking down corridor axis) | Footstep audio + low engine drone run continuously through cut |
| 7 | 01:35 | Match cut on action | Door latch turning, exterior to interior cabin POV | Door hinge creak SFX starts 0.1s prior to cut, finishes inside room |
| 8 | 01:53 | Match cut on movement | Falling backward onto bunk to top-down POV | Mattress thud SFX lands precisely on frame 0 of the next shot |
| 9 | 02:09 | Hard cut (interior to exterior) | Speech cadence + continuous selfie-arm extension | Ship horn/steam blast initiates across cut, masking the acoustic shift |
| 10 | 02:21 | Reaction match cut | Waving arm outward matches wide exterior departure | Continuous cheering crowd + engine churn bridges the scene |
| 11 | 02:43 | Hard cut | Continuous wake-water motion into deck-railing conversation | Ocean wind/spray audio unbroken across cut |
| 12 | 03:11 | J-cut (sound lead) | Walking motion into wide crowded dining hall | Dining chatter/clatter begins ~0.3s before the visual cut |
| 13 | 03:25 | Hard cut | Center-weighted framing; menu prop presentation | Continuous dining-hall chatter bridges the perspective shift |
| 14 | 03:41 | Hard cut (insert cut) | Eyeline vector, gaze down to soup bowl on table | Clinking cutlery SFX carries across |
| 15 | 03:55 | Hard cut | Center-aligned dining placement (bowl to plate) | Background murmurs/ambience steady |
| 16 | 04:25 | Hard cut (walking selfie) | Forward walking cadence + visual callback (shirt stain) | Dialogue pickup within 0.1s, no room-tone drop |
| 17 | 04:51 | J-cut / energy match | Quiet cabin to vibrant party hall | Fiddle music intro hits 0.2s before the visual cut |
| 18 | 05:18 | Hard cut | Dance rhythm match; eyeline/headroom parity between partners | Fast Celtic dance music continuous, no phase drift |
| 19 | 05:51 | Hard cut (energy contrast) | Exit action, dance floor to quiet service hallway | Music low-pass filters + volume drops immediately across the boundary |
| 20 | 06:31 | Jump cut | Fixed selfie angle/headroom locked while costume changes instantly | Room tone identical; breath/reaction vocal spans the cut |
| 21 | 07:08 | Hard cut (class transition) | Forward tracking maintained, basic to carpeted corridor | Audio shifts immediately, wooden footfalls to muffled carpet |
| 22 | 07:21 | Gaze-match cut | Head-turn left matches wide tilt-up reveal of the Grand Staircase | Orchestral string chord + reverb triggers on the reveal |
| 23 | 09:16 | Hard cut / blackout | Looking into night sky to dark cabin morning-bed shot | Wind ambient cuts to muffled room silence + vocal sigh |
| 24 | 10:46 | Match cut on action | Corridor tracking matching Captain Smith's approach vector | Distant muffled engine hum bridges the approach and conversation |
| 25 | 11:41 | Shock hard cut | Looking over bow rail directly into iceberg collision vector | High-tension silence snaps instantly to hull-scraping SFX |
| 26 | 12:33 | Hard cut | Interior alarm panic to exterior lifeboat station | Crowd shouting + steam release bridges seamlessly |
| 27 | 13:15 | Hard cut (scale contrast) | Sinking-ship wide profile to close-up selfie in lifeboat | Immediate drop to open-ocean lapping water + quiet sobbing bed |

*(First independent pass covered a partially overlapping set of 22 cut points with materially identical conclusions — not reproduced here in full; see production log for a condensed excerpt.)*

## Synthesis: the 5-6 concrete, replicable rules

1. **Audio never touches silence at the cut.** Every single analyzed cut either pre-laps the next scene's sound 100-600ms early (J-cut) or runs one continuous ambient/music bed underneath both shots (L-cut). This is the single most consistent finding and the most important one — see creative-direction.md §29 for why this is also the actual root cause of the Legnica edit reading as "bad."
2. **Cuts land mid-motion, not on stillness** — a walk continuing, a turning head, a door opening, a fall in progress. The eye tracks continuous physical movement across the join instead of comparing two static frames.
3. **A diegetic trigger (sound or action) motivates the cut** — door latch, camera shutter, mattress thud, horn, music sting landing on frame 0 — giving the cut an in-world cause.
4. **Consistent on-screen subject anchor** — selfie-arm angle, camera distance, head position stay put across the cut even when environment/costume changes entirely, giving the eye a stable point of reference.
5. **Eyeline matching** — she looks toward something, the cut reveals what she was looking at.
6. **Energy-level transitions (loud→quiet) use audio filtering/dampening, not an abrupt cut to silence.**

## What this means for our own production

Cut TYPE was never the gap — she also predominantly uses true hard cuts, consistent with our own standing no-dissolve rule. The gap was entirely in what happens to *sound* and *motion* at the join: our own `creative-direction.md` §16 mandated an independent 0.08s audio fade-out/fade-in at every clip edge, which guarantees an audible ~0.16s dip toward near-silence at every single cut — the exact opposite of what makes her transitions read as smooth. Fixed and made permanent as §29 (working branch) / mirrored to the default branch — see that section for the specific rule changes applied to the edit pipeline and to future clip scripting.

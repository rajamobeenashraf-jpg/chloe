#!/usr/bin/env node
// Red Sea reel recreation (owner request 2026-09-04) — assembles the Seedance 2.5
// payload for every clip from the shot list below + frozen blocks, so no prompt is
// hand-assembled. Prints JSON payloads for generate_video_batch.
//
// Usage: node build_prompts.mjs            -> all clips (JSON array)
//        node build_prompts.mjs --clip 04  -> one clip
//        node build_prompts.mjs --batch 1  -> clips 1..12 (batches of 12)
//
// Prompt dialect: PROMPT_LEARNINGS.md (S2 start-frame, S13 @-tag roles, template
// order, positive lock tails, cause-before-reaction), playbook Part 6 (official
// Seedance doctrine: dialogue only in the audio clause, {} for lines, no negation
// stacks, first-frame as a prompt statement).

const args = process.argv.slice(2);
const argv = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };

// ---------- REFERENCE MEDIA (Higgsfield job IDs) ----------
export const REFS = {
  HAZEL: [
    { value: "119465f3-c465-4f11-873e-dfa2883c36c6", note: "v5 master 4K" },
    { value: "8f22ad52-3db6-4c69-ac9f-77cfc4dd3e24", note: "face front 4K" },
    { value: "274e937a-2e4e-485d-92a0-d17bd96e0ca3", note: "face 3/4 4K" },
    { value: "1a8133ee-32c6-4600-a488-67c404276333", note: "full-body front 4K" },
    { value: "17af1f93-300c-406a-9047-e36bb9a61497", note: "full-body 3/4 walking 4K" },
    { value: "3ba4ea27-5122-4de7-aece-c24a33208afe", note: "expression laugh 4K" },
    { value: "d7ea2bd4-7c37-463e-914f-dba377a3a51c", note: "expression anger 4K" },
    { value: "9a6e8cb0-4524-4f7e-8a0d-578aae62b6b5", note: "costume A still (owner-picked 2026-09-04)" },
  ],
  // Owner picks 2026-09-04 (second round): Moses = M2 "prophet" look; Pharaoh = P3 face re-dressed as king.
  // Superseded first-round sets (never use): Moses v2 c71603f3 + 85a2096e/a6ba66fb/5aeca34c; Pharaoh 11357887 + f09de884/ddd20f4a/eeee3e41.
  MOSES: [
    { value: "0d0e17ce-bfc0-47be-8da3-a319f5e81e02", note: "master M2 (owner-picked)" },
    { value: "27999778-0a59-430b-ba8b-813c5dd2cd49", note: "face front (photo-edit of M2)" },
    { value: "db232637-ca8a-448c-8e91-50f40c362137", note: "face 3/4 shout (photo-edit of M2)" },
    { value: "9c502bbd-5e3b-4ffe-805d-2a5d2f5fc516", note: "full-body 3/4 staff raised (photo-edit of M2)" },
  ],
  PHARAOH: [
    { value: "a2fa48f3-1a44-4631-b49a-e6cdad2afc21", note: "master: P3 face in royal regalia (photo-edit)" },
    { value: "ff1fc9d4-0331-40ea-9f59-3408bf7d63cb", note: "face front (photo-edit)" },
    { value: "a2bdc002-f3ac-427f-8e78-de485b4c2bdb", note: "face 3/4 snarl (photo-edit)" },
    { value: "9e17d80f-e155-4bde-b986-9af288d0ecef", note: "full-body in chariot (photo-edit)" },
  ],
  // v2 plates (2026-09-05, forensic re-watch): reference-exact compositions with the locked characters.
  ENV_V2: {
    opening_split: "30f9c883-3759-44ee-8c68-2e473b7c610f", // 01
    behind_hillock: "0d309eae-52e0-4b66-9ae0-b810afe85624", // 03, 05
    moses_frontal_mound: "1802fa8a-ba94-47c1-891b-b5d71205cc8c", // 04
    behind_column: "1c4fec39-b13c-44a1-b485-ca63024b725b", // 10
    family_lateral: "d0e60587-f45e-4992-a4df-778e36c1547c", // 12
    pharaoh_corridor: "4ad43d26-4d66-47c5-8abc-dc276b9abf9c", // 17
    farshore_climb: "186ab942-0da0-464a-bb50-17f712e9e692", // 18
    pharaoh_underwater: "864b4e23-e137-431d-be77-c3742c9fc895", // 30
  },
  ENV: {
    opening: "f419b819-ec89-4b44-9459-fe45fa807111",
    aerial: "da9c958c-40fc-4a43-8cd2-1fa312eb585c",
    corridor: "0e32b90c-7363-4666-bc39-b9d79dde5517",
    charge: "64839885-f4f9-455a-8f4e-0a3f87201042",
  },
  AUDIO: {
    hazelVoiceLock: "b24e5759-d3c0-4c84-a184-44f7cc65477e", // project-wide voice-identity lock
    pacing: { H1: "9741a763-9a2c-4552-aa92-ac21fe096a92", H2: "2ea83916-461c-41e8-ad84-6282feb51f02", H3: "ac09ac75-c50d-4ece-bcb8-672bf01abe83", H4: "bf77eb94-1ef0-4481-9dcd-1a9352ef7c27" }, // seed_audio takes time-stretched to 264/211/264/185+99 wpm, measured 2026-09-04
  },
};

// ---------- FROZEN BLOCKS (paste verbatim; never paraphrase) ----------
const HAZEL_IDENTITY = `The EXACT same woman shown in the reference images — all references depict ONE single identical person. Render precisely: her softly rounded face with fuller youthful cheeks and a small cute button nose; her LARGE round doe-like light-hazel eyes with long natural lashes; her bold thick dark-brown softly-arched eyebrows; her full lips in their BARE natural soft-pink color with real lip texture — no gloss, no lipstick look, never thin; her hairline and long straight light-brown bronde balayage hair with center parting; her FAIR, light complexion with a soft rosy-pink undertone and pink-kissed cheeks — NOT golden-tan, NOT porcelain-white, never washed-out; only the faintest delicate trace of tiny freckles on the nose bridge and upper cheeks, forehead mostly clear; her body proportions and figure; her age (early twenties). No beautification beyond the references, no redesign, no changes between this and the references. She must read as a real, physically-photographed human being: natural skin texture with visible pores, fine vellus hair, and authentic micro-imperfections; subtle natural asymmetry; real weight and movement in her hair and clothing. She must NEVER look like an AI generation, a 3D render, a smoothed/filtered/airbrushed image, or a synthetic "plastic AI face" — 100% natural, human, and believable is the single most important requirement of every generation, non-negotiable.`;

const HAZEL_LOOK = `HAZEL'S LOOK (owner-picked Option A, styled by Claude): ankle-length woven wool dress in horizontal bands of red ochre, indigo and cream with geometric borders (Beni Hasan style), over a cream linen underdress, tied with a twisted rope belt; a carnelian and blue-faience bead necklace; two plain copper bangles on her left wrist; flat leather thong sandals. Hair: a single loose side braid over her left shoulder with wind-loosened strands, bronde color unchanged. Makeup: light and era-true — a thin soft line of kohl along the upper lashes, clean natural base with her freckle trace visible, her own bare soft-pink lips, no gloss. Tall (~5'9"), hourglass figure, fit.`;

const MOSES_LOCK = `MOSES — the exact man in his reference images: a tall, dignified prophet with a luminous, serene, handsome face — clear glowing bronze-olive skin, warm radiant amber-brown eyes, straight nose, an expression of calm strength; a long thick silver-white beard falling to mid-chest and long silver-white hair parted in the center falling past his shoulders; a floor-length robe of undyed cream linen with a deep-blue wool over-mantle draped over the shoulders and belted with a woven cord, leather sandals; a tall gnarled wooden staff. Light seems to rest on his face. Voice: deep, warm, resonant, authoritative.`;

const PHARAOH_LOCK = `PHARAOH — the exact man in his reference images: tall, wiry, striking, angular face with prominent cheekbones, a hooked aquiline nose and cleft chin, piercing pale-brown eyes heavily lined with black kohl, warm copper-brown skin; gold-and-lapis striped nemes headcloth with a golden cobra and vulture at the brow; a wide multi-row collar of gold, lapis, carnelian and turquoise beads, a gold winged-scarab pectoral, a pleated white royal linen kilt with a stiff gold-embroidered front apron and jewelled gold belt, a pleated white linen shirt open at the chest, thick gold armlets and wrist cuffs, gold-trimmed sandals; drives a light wooden two-horse Egyptian war chariot with two dark horses, reins in his fists, a gold-and-blue striped flail or leather whip. Voice: sharp, cold, commanding.`;

const STYLE_PREFIX = `EPISODE STYLE (frozen): vertical 9:16, real-time continuous take, single continuous unbroken shot, no internal cuts, no scene changes. Photographed on a full-frame cinema camera with real lenses (anamorphic-free, spherical), natural motion blur, fine film grain, deep focus on wides and shallow depth of field (f/2 look, heavy background bokeh) on close-ups. Light: overcast storm sky with god-rays breaking through, cold slate-teal sky and sea against warm earth tones of cloth and dust; color grade muted, desaturated, unpolished, bleak epic — never candy-saturated, never glowing. Water is real seawater with real physics: heavy, dark green-blue, churning white foam, spray, mist, wet reflective seabed. People are real photographed humans with pores, dirt, sweat, wind in hair and cloth; every background person is individually different in face, build and exact era-correct clothing. Everything reads as physically-photographed footage: zero AI aesthetic, zero painterly smearing, zero 3D-render look, zero smoothed skin.`;

const ENV_SEA = `THE RED SEA CROSSING, LATE BRONZE AGE: the sea has been split into a straight dry corridor of wet dark seabed (sand, shells, weed, shallow puddles) running to the horizon; on BOTH sides stand towering vertical walls of dark green-blue seawater, hundreds of feet high, churning white foam along their faces, spray drifting off their crests, sunlit mist inside the corridor. The Israelites are a column of thousands — men, women, children, elders, donkeys, goats, sheep, bundles — in undyed and earth-toned wool and linen tunics, fringed mantles and headscarves, each person different, extending past the frame edges and receding into the mist. The Egyptian force is hundreds of light two-horse wooden war chariots with drivers and archers in white linen kilts, leather and bronze scale armor, striped headcloths, bows and spears, dust and spray boiling from wheels and hooves, with more chariots receding in depth behind the nearest ones. The world continues beyond every frame edge.`;

const REALISM_TAIL = `Diegetic sound only: environmental SFX and any stated dialogue. Music is off. Subtitles are off. No on-screen text, no logos, no watermarks. Single continuous take, real-time speed, no slow motion unless stated, no repeated action, no duplicated people or props, no object teleportation.`;

const HAZEL_REF_ROLE = (a, b) => `@Image${a}–@Image${b} control ONLY Hazel's identity (face, eyes, hair color, skin, figure) and, from @Image${b} specifically, her wardrobe and hairstyle. Full-preserve fidelity for the face. Do not copy pose, background, lighting or camera angle from them.`;

// ---------- SHOT LIST ----------
// dur = Seedance integer seconds (min 4). srcDur = source shot length for the edit trim.
// chars: HAZEL / MOSES / PHARAOH. env: start-frame plate key. audio: audio refs keys.
export const CLIPS = [
  { id: "01", srcDur: 3, dur: 4, chars: ["MOSES"], env: "opening",
    start: "@Image1 is the FIRST FRAME: the exact composition of the opening plate — a rocky promontory in the foreground, Moses standing at its edge with his back mostly to camera, staff raised; below him a vast crowd of Israelites facing a dark storm-driven sea under god-rays. Keep this composition; do not redesign it.",
    timeline: `0.0–1.5s: high wide, the crowd sways and murmurs, wind whips cloaks and hair, sea heaves; Moses stands braced, staff already high, mantle snapping in the wind.
1.5–4.0s: Moses thrusts the staff higher and holds it; the crowd stills; the sea surface directly ahead of the rock begins to bulge and shiver as if pulled.`,
    camera: `High angle, extreme wide. One dominant move: a slow, steady push-in that also tilts down slightly toward Moses and the sea, deep focus, ultra-wide lens (FOV ~90°). Smooth crane-like motion, no shake.`,
    audio: `<howling wind, a deep sub-bass rumble growing, thousands of murmuring voices, surf>`,
    end: "Final frame: Moses at the rock edge, staff held at full height, the sea in front of him visibly heaving upward, crowd still." },

  { id: "02", srcDur: 2, dur: 4, chars: ["MOSES"], env: "opening",
    start: "Bird's-eye view straight down from very high above the shoreline: Moses is a tiny figure on the dark rock at the bottom-center of frame, the crowd a dense mass behind him, the dark sea filling the upper frame.",
    timeline: `0.0–1.0s: the sea directly in front of the rock splits — a straight seam opens and the water explodes outward to left and right in two rising walls of white foam and dark water.
1.0–4.0s: the two walls climb and separate, spray towering, a dark wet corridor of seabed appearing between them and racing away toward the top of frame.`,
    camera: `Top-down bird's-eye view. One dominant move: a rapid pull-back / crane-up, the camera rising fast so the split sea grows to fill the frame. Real parallax, smooth.`,
    audio: `<a massive water explosion, deep sub-boom, violent rushing currents, thunder>`,
    end: "Final frame: from high above, two parallel water walls with a dark corridor between them running toward the top of frame; Moses' rock tiny at bottom-center." },

  { id: "03", srcDur: 5, dur: 5, chars: [], env: "corridor",
    start: "@Image1 is the FIRST FRAME: standing on the wet seabed looking straight down the corridor, two towering curled water walls to the left and right, sunlit mist between them. Keep this composition exactly.",
    timeline: `0.0–5.0s: the two water walls tower and churn, their crests curling slightly inward and throwing spray; mist drifts through shafts of light; the wet seabed glistens; small rivulets run off the wall bases. No people in this shot.`,
    camera: `Low-to-eye level, very wide (FOV ~85°). One dominant move: a slow, steady push forward into the corridor along its center axis, smooth dolly, deep focus.`,
    audio: `<enormous held roar of standing water, dripping and running water, wind funneling down the corridor, distant thunder>`,
    end: "Final frame: deeper into the corridor, walls filling both edges, mist and light ahead." },

  { id: "04", srcDur: 5, dur: 5, chars: ["MOSES"], env: null,
    start: "Moses stands on wet sand at the mouth of the corridor, the two water walls towering behind him on either side, facing the camera and the crowd beyond it, staff in his right hand, mantle blowing.",
    timeline: `0.0–0.6s: Moses draws breath, eyes blazing, brows down, and plants the staff.
0.6–5.0s: he shouts his lines straight at the camera and the crowd behind it, mouth wide, beard and hair whipping, free hand thrust forward and open; his eyes are on the lens the entire time. Behind him spray drifts off the wall crests.`,
    camera: `Low angle (camera below his chest height, looking up), medium-full framing tightening to medium close-up. One dominant move: a slow push-in toward his face. Shallow depth of field, heavy background bokeh on the water walls.`,
    dialogue: `Dialogue language: Biblical Hebrew. Moses shouts, deep booming gravel voice, with a slight reverberant echo off the water: {Al-tira'u! Adonai yillachem lachem!}`,
    audio: `<wind, water roar, crowd murmur behind camera, his voice echoing>`,
    end: "Final frame: medium close-up of Moses, mouth closing after the last word, eyes locked on the lens, staff planted." },

  { id: "05", srcDur: 4, dur: 4, chars: ["MOSES"], env: "opening",
    start: "@Image1 is the FIRST FRAME composition: high wide over the promontory, Moses at its edge, the crowd below, but now the sea ahead is SPLIT — two standing walls with a dark corridor between them leading away.",
    timeline: `0.0–4.0s: the walls settle into a steady towering stand, spray calming; the corridor floor drains and glistens; the crowd below begins to stir forward toward it; Moses lowers the staff slowly to his side and turns his head toward the corridor.`,
    camera: `High angle, extreme wide. One dominant move: a slow steady push forward over the crowd toward the corridor mouth, deep focus.`,
    audio: `<water roar settling to a steady rush, wind, the crowd's murmur rising into movement, feet and hooves on sand>`,
    end: "Final frame: the corridor mouth centered, the first of the crowd stepping onto the wet seabed, Moses at the rock edge with the staff lowered." },

  // ---- HAZEL H1 (after 05) ----
  { id: "H1", srcDur: 6, dur: 6, chars: ["HAZEL", "MOSES"], env: null, hazelSpeaks: true, pacing: "H1",
    start: "Hazel walks with the front of the crowd onto the wet seabed at the corridor mouth, the water walls towering on both sides, Israelites streaming past her on both sides; Moses is visible far behind her on his rock, small and soft-focus.",
    timeline: `0.0–0.5s: Hazel walks forward, glancing over her shoulder back toward Moses, then her eyes come to the lens.
0.5–2.0s: her eyes flick up to the left wall on "Red Sea", then back to the lens.
2.0–3.5s: she jerks her thumb over her shoulder without looking back on "behind us"; her eyes go back over her shoulder for a half-second on "Pharaoh", then snap to the lens.
3.5–6.0s: she finishes the line to the lens, jaw tight, breath visible and quick, walking faster; a mother with a child on her hip hurries past on her right.`,
    camera: `Eye level. One dominant move: the camera leads her, tracking backward smoothly at her walking pace so she stays in a medium shot (waist-up) while she walks normally forward, facing her direction of travel — she is NOT walking backward. Shallow depth of field, crowd and walls soft behind her.`,
    gfb: `GAZE: over her shoulder to Moses at the start, to the left water wall on its name, back over her shoulder on "Pharaoh", the lens for the key sentences — never a continuous lens lock. FACE: scared and fast — eyes wide, brows up and in, jaw tight, quick breaths; the fear arrives before the words. BODY: walking forward at a hurried pace, weight moving, one hand holding her braid down against the wind, the thumb-jerk gesture on "behind us".`,
    dialogue: `Dialogue language: English (American). Hazel speaks in a hushed, urgent, fast voice: {Okay. That is Moses. That is the Red Sea, standing up. And behind us, that dust is Pharaoh. We have minutes.}`,
    audio: `<water roar, wind, hundreds of feet and hooves splashing on wet sand, goats, a child crying, murmuring>`,
    end: "Final frame: Hazel mid-stride, medium shot, eyes on the lens, crowd streaming past, walls on both sides." },

  { id: "06", srcDur: 4, dur: 4, chars: ["PHARAOH"], env: "charge",
    start: "@Image1 is the FIRST FRAME composition: low-angle wide on a pale desert plain, a massive chariot force charging from right to left, dust boiling, storm clouds with sunbeams. Pharaoh's chariot is the nearest one, at frame center-right.",
    timeline: `0.0–4.0s: Pharaoh drives his chariot at full gallop from right to left, leaning forward, reins in both fists, the two dark horses stretched out at a flat run; dozens of chariots run alongside and behind him, hundreds more in the dust beyond; dust rolls up behind the wheels; sun shafts flicker across them.`,
    camera: `Low angle, wide. One dominant move: a lateral tracking shot moving right-to-left parallel with the chariots at their speed, keeping Pharaoh's chariot in frame, background streaking, real parallax. Fast shutter feel, natural motion blur on wheels.`,
    audio: `<massed galloping hooves, wooden chariot creaks and rattles, whip cracks, shouted Egyptian war cries, wind>`,
    end: "Final frame: Pharaoh's chariot still at frame center, the formation stretching away behind him into dust." },

  { id: "07", srcDur: 4, dur: 4, chars: ["PHARAOH"], env: null,
    start: "Tight close-up of Pharaoh's face in his moving chariot, the nemes headcloth flapping, dust and sky streaking behind him.",
    timeline: `0.0–4.0s: Pharaoh, enraged, snarls and shouts orders forward and to the side, teeth bared, kohl-lined eyes narrowed, sweat and dust on his skin; his head jolts with the chariot's bounce; his whip hand rises and cracks once at 2.0s.`,
    camera: `Low handheld close-up moving with the chariot, tracking alongside; subtle organic camera shake from the ride. Very shallow depth of field, background bokeh streaking.`,
    dialogue: `Dialogue language: Ancient Egyptian (unintelligible shouted commands, no subtitles). Pharaoh shouts: {[furious shouted commands]}`,
    audio: `<hooves, chariot rattle, a whip crack at 2 seconds, wind roar, his shouting>`,
    end: "Final frame: extreme close-up on Pharaoh's snarling face, eyes forward." },

  { id: "08", srcDur: 5, dur: 5, chars: [], env: "aerial",
    start: "@Image1 is the FIRST FRAME: high-altitude aerial looking down and along the straight sea corridor toward the far horizon, the water walls on both sides, a thin column of tiny Israelite figures walking away along it.",
    timeline: `0.0–5.0s: the column of tiny figures moves slowly along the corridor; spray drifts from the wall crests; mist slides through the light; the open sea outside the walls heaves.`,
    camera: `High-altitude aerial, extreme wide, looking down and forward along the corridor axis. One dominant move: a slow forward drift along the corridor, smooth, deep focus.`,
    audio: `<wind at altitude, the distant roar of the standing sea>`,
    end: "Final frame: the same view, slightly further along the corridor." },

  { id: "09", srcDur: 4, dur: 4, chars: [], env: "charge",
    start: "High diagonal aerial over the desert plain: a massive formation of hundreds of Egyptian chariots charging across the plain toward the shoreline and the corridor mouth at the top of frame, dust plumes trailing.",
    timeline: `0.0–4.0s: the chariot formation surges forward across the plain, dust boiling behind it; the corridor mouth and the split sea come into view at the top of frame as the camera tilts down and moves forward.`,
    camera: `High aerial, extreme wide. One dominant move: moving forward while tilting down onto the charging formation, smooth, deep focus.`,
    audio: `<massed hooves like thunder, wind, distant war cries>`,
    end: "Final frame: the formation filling the lower frame, the corridor mouth at the top." },

  { id: "10", srcDur: 4, dur: 4, chars: [], env: "corridor",
    start: "@Image1 is the FIRST FRAME environment: eye level on the wet seabed inside the corridor, water walls on both sides. Fill it with the Israelite column walking away from camera: families, elders, donkeys with bundles, goats, sheep, all in earth-toned wool and linen, each person different.",
    timeline: `0.0–4.0s: the crowd walks away from camera along the muddy seabed, feet splashing in shallow puddles, a donkey tossing its head, a child riding a father's shoulders, an old man with a staff; the walls churn above them; the camera follows behind them.`,
    camera: `Eye level, medium-wide. One dominant move: a slow forward track behind the crowd at their walking pace, smooth, deep focus.`,
    audio: `<feet and hooves splashing, goats bleating, murmuring, water roar, wind>`,
    end: "Final frame: the crowd still walking away, corridor and walls unchanged." },

  { id: "11", srcDur: 3, dur: 4, chars: [], env: "aerial",
    start: "@Image1 is the FIRST FRAME: the same high-altitude aerial of the corridor as before, the column of tiny figures now further along toward the far shore.",
    timeline: `0.0–4.0s: slow drift forward; the column inches toward the far shore; spray and mist move; the storm sky shifts.`,
    camera: `High-altitude aerial extreme wide, slow forward drift along the corridor axis, deep focus, smooth.`,
    audio: `<wind at altitude, distant sea roar>`,
    end: "Final frame: same aerial view, slightly advanced." },

  { id: "12", srcDur: 4, dur: 4, chars: [], env: "corridor",
    start: "Eye height inside the corridor: an exhausted mother in a dust-stained brown wool dress and headscarf carries a sleeping infant against her chest, walking with two small children holding her skirt and a bent elder with a staff beside her; other families move around them; water walls tower on both sides.",
    timeline: `0.0–4.0s: she walks, breathing hard, shifting the infant's weight, eyes down on the wet ground then up toward the far shore; a child stumbles in a puddle and she pulls him up by the hand without stopping; the elder plants his staff with each step.`,
    camera: `Eye height, medium shot on the mother. One dominant move: a sideways-and-forward tracking move alongside the family at their walking pace, smooth, shallow depth of field on the mother with the crowd soft behind.`,
    audio: `<her breathing, feet splashing, the infant stirring, goats, murmuring, water roar>`,
    end: "Final frame: the mother mid-stride, infant against her chest, children at her skirt." },

  // ---- HAZEL H2 (after 12) ----
  { id: "H2", srcDur: 6, dur: 6, chars: ["HAZEL"], env: null, hazelSpeaks: true, pacing: "H2",
    start: "Hazel walks beside the same exhausted mother (dust-stained brown wool dress and headscarf, sleeping infant against her chest, two small children at her skirt) inside the corridor, water walls on both sides, families moving around them.",
    timeline: `0.0–1.5s: Hazel glances at the mother and the children beside her, then her eyes come to the lens as she speaks the first sentence.
1.5–3.5s: her eyes go back over her shoulder on "fastest army", then return to the lens.
3.5–6.0s: on "kids and goats" her hand gestures sideways at the children and a goat trotting past; her eyes follow the gesture to them and then come back to the lens; she keeps walking.`,
    camera: `Eye height, medium shot. One dominant move: sideways-and-forward tracking alongside Hazel and the family at walking pace (the same move as the mother's shot), smooth, shallow depth of field with the crowd soft behind.`,
    gfb: `GAZE: the mother and children first, the lens for the numbers, over her shoulder on "army", to the children and goat on "kids and goats", back to the lens. FACE: grim and quick — brows drawn, lips pressed between sentences, a tired exhale. BODY: walking forward beside the mother, one hand briefly steadying the small child's shoulder, the sideways gesture on the last line.`,
    dialogue: `Dialogue language: English (American). Hazel speaks quickly, tense and flat: {Six hundred chariots. The fastest army on Earth. We are on foot, with kids and goats.}`,
    audio: `<feet splashing, goats, a child, murmuring, water roar, wind>`,
    end: "Final frame: Hazel mid-stride beside the mother, eyes on the lens." },

  { id: "13", srcDur: 4, dur: 4, chars: [], env: "aerial",
    start: "Directly overhead, top-down, at moderate height: the dense Israelite column filling the corridor floor below, people and animals seen from above, the wet seabed glistening, the bases of the water walls churning at the left and right edges.",
    timeline: `0.0–4.0s: the crowd flows along the corridor beneath the camera; the camera tracks along the column in its direction of travel; foam surges at the wall bases.`,
    camera: `Top-down overhead wide. One dominant move: tracking along the column at slightly faster than walking pace, smooth, deep focus.`,
    audio: `<massed feet and hooves splashing, murmuring, the sea roar>`,
    end: "Final frame: the column still flowing below, walls at both edges." },

  { id: "14", srcDur: 6, dur: 6, chars: ["MOSES"], env: null,
    start: "Moses stands in the corridor with his back to the camera, staff in hand, watching his people pass ahead of him toward the far shore; water walls tower on both sides.",
    timeline: `0.0–3.0s: the camera pushes in on his back; his mantle moves in the wind; people stream past on both sides of him.
3.0–6.0s: he turns around slowly to face the camera, solemn and resolute, eyes settling on the lens and holding, jaw set, breath steady; his hand tightens on the staff.`,
    camera: `Eye level. One dominant move: a slow push-in from a medium-wide shot on his back to a close-up as he turns, ending on his face. Shallow depth of field at the end.`,
    audio: `<wind, water roar, feet passing, his breath>`,
    end: "Final frame: close-up of Moses facing the lens, solemn, still." },

  { id: "15", srcDur: 3, dur: 4, chars: ["PHARAOH"], env: null,
    start: "Head-on view of Pharaoh's chariot at full gallop on the desert plain, the two dark horses filling the lower frame, Pharaoh above and behind them, more chariots behind him in dust.",
    timeline: `0.0–4.0s: the horses gallop straight at the camera, nostrils flared, hooves throwing dust; Pharaoh whips the reins hard twice, face furious, shouting; the chariot bounces; the formation behind him surges.`,
    camera: `Medium shot, head-on. One dominant move: the camera tracks backward directly ahead of the galloping horses at their speed, keeping them and Pharaoh framed, slight organic shake, shallow depth of field on Pharaoh.`,
    audio: `<hooves pounding, harness jingling, whip cracks, Pharaoh shouting, wind>`,
    end: "Final frame: horses and Pharaoh still charging at the camera." },

  { id: "16", srcDur: 5, dur: 5, chars: [], env: "corridor",
    start: "High angle at the corridor mouth: the leading Egyptian chariots race down onto the wet seabed and into the corridor between the water walls, dust turning to spray as wheels hit water.",
    timeline: `0.0–5.0s: chariot after chariot pours into the corridor, wheels throwing mud and spray, horses slipping and recovering, the column of chariots stretching back onto the beach; the walls tower over them.`,
    camera: `High angle, wide. One dominant move: tracking forward ahead of and above the leading chariots as they enter the corridor, smooth, deep focus.`,
    audio: `<hooves on wet sand, splashing, chariot rattles, war cries, water roar>`,
    end: "Final frame: the chariot column inside the corridor, still charging." },

  { id: "17", srcDur: 3, dur: 4, chars: [], env: null,
    start: "Ground level, camera almost on the wet seabed inside the corridor: chariot wheels and horses' legs thunder past, close, splashing water and mud toward the lens.",
    timeline: `0.0–4.0s: wheel after wheel hammers through puddles, spokes blurring, hooves throwing mud and spray onto the lens; kilts and legs of drivers flash past above; the water wall looms in the background.`,
    camera: `Ground level, low angle, wide. One dominant move: tracking alongside the passing chariots at their speed, spray hitting the lens, natural motion blur.`,
    audio: `<hooves and wheels hammering wet ground, splashing, spray hitting the lens, chariot creaks>`,
    end: "Final frame: another wheel passing close, spray on the lens." },

  { id: "18", srcDur: 2, dur: 4, chars: [], env: null,
    start: "From low on the seabed looking up the sloping far shore: the leading Israelites climb up out of the corridor onto dry sand at the top, silhouetted against a brightening sky, helping each other, children lifted up.",
    timeline: `0.0–4.0s: families scramble up the wet slope onto the shore, hands reaching down to pull others up, a donkey led up, an old woman helped by two men; the camera tilts up with them.`,
    camera: `Wide, reverse angle from the seabed. One dominant move: an upward tilt from the wet slope to the shore exit as the people climb, smooth, deep focus.`,
    audio: `<feet scrambling on wet sand, shouts of relief, a child laughing, wind, sea roar behind>`,
    end: "Final frame: the shore exit at the top of frame, people cresting it into the light." },

  // ---- HAZEL H3 (after 18) ----
  { id: "H3", srcDur: 4, dur: 4, chars: ["HAZEL"], env: null, hazelSpeaks: true, pacing: "H3",
    start: "Hazel is climbing the last of the wet slope onto the far shore among the Israelites, hands and knees on the sand, the corridor and water walls behind and below her.",
    timeline: `0.0–1.2s: she scrambles up over the crest onto dry sand, gets to her feet, breathless, and turns back to face the camera and the corridor.
1.2–2.5s: eyes on the lens, gasping, she says the first sentence.
2.5–4.0s: her eyes drop past the camera to the corridor below on "they did not stop", her arm pointing down at it; then her eyes come back up to the lens, wide.`,
    camera: `Wide from low on the slope. One dominant move: an upward tilt following her as she crests the shore, ending on a medium shot of her against the sky, deep focus.`,
    gfb: `GAZE: the ground and her hands as she climbs, the lens for "We made it", down past the camera at the corridor on the second sentence, back to the lens. FACE: breathless relief that curdles — a half-laugh exhale, then eyes widening, mouth open. BODY: scrambling up on hands and knees, standing, chest heaving, the pointing arm down at the corridor, sand on her palms.`,
    dialogue: `Dialogue language: English (American). Hazel, breathless and fast: {We made it. They did not stop.}`,
    audio: `<her breathing, feet on sand, shouts of relief around her, wind, and rising from below: hooves and chariot rattle in the corridor>`,
    end: "Final frame: Hazel standing at the shore crest, medium shot, eyes wide on the lens, corridor behind her." },

  { id: "19", srcDur: 2, dur: 4, chars: ["PHARAOH"], env: null,
    start: "Close-up of Pharaoh in his chariot inside the corridor, the water walls looming close on both sides, spray and drips falling around him.",
    timeline: `0.0–1.5s: Pharaoh, still driving, looks up at the wall beside him as water drips onto his face and shoulders.
1.5–4.0s: alarm spreads across his face — eyes widening, mouth opening, brows lifting — as a heavy drip becomes a spatter and the wall beside him shudders; he pulls back on the reins.`,
    camera: `Close-up. One dominant move: a fast push-in onto his face, shallow depth of field, slight ride shake.`,
    audio: `<dripping and spattering water, a deep groan from the water wall, hooves slowing, chariot rattle, his sharp breath>`,
    end: "Final frame: extreme close-up of Pharaoh's alarmed face, water running down it." },

  { id: "20", srcDur: 2, dur: 4, chars: ["MOSES"], env: null,
    start: "Rear view: Moses walks up out of the corridor onto the dry far shore, staff in hand, the last Israelites climbing ahead of him, the corridor and walls behind the camera's position now ahead of him no longer — he is walking away from the sea.",
    timeline: `0.0–4.0s: Moses walks steadily up the sandy slope away from the camera onto dry shore, mantle blowing, people cresting the slope ahead of him; the camera holds then eases back.`,
    camera: `Wide, from behind. One dominant move: a very slow pull-back as he walks away, smooth, deep focus.`,
    audio: `<wind, his sandals on sand, distant relieved voices, the sea roar behind>`,
    end: "Final frame: Moses' back, near the top of the slope." },

  { id: "21", srcDur: 2, dur: 4, chars: ["PHARAOH"], env: null,
    start: "Front-facing medium shot of Pharaoh's chariot charging through the corridor, the horses' heads in the lower frame, mist and spray building around them, walls close on both sides.",
    timeline: `0.0–4.0s: the horses gallop toward the camera through thickening mist; spray flies; Pharaoh drives on, face set, glancing up at the walls; spray increases until it half-hides the chariots behind him.`,
    camera: `Medium, head-on. One dominant move: tracking backward ahead of the chariot at its speed, shallow depth of field, spray on the lens.`,
    audio: `<hooves splashing, chariot rattle, rising water roar, wind>`,
    end: "Final frame: Pharaoh's chariot still charging at the camera in heavy spray." },

  { id: "22", srcDur: 4, dur: 4, chars: ["MOSES"], env: null,
    start: "Moses stands on the dry far shore at the top of the slope, medium-full shot, with his back half to the camera, looking down at the corridor below where the chariots are visible as small shapes in mist.",
    timeline: `0.0–2.0s: Moses turns his body back toward the sea, slowly, staff in hand, mantle blowing.
2.0–4.0s: he raises the staff in both hands to chest height and his face sets, eyes on the corridor, breath deep; behind him the sky darkens.`,
    camera: `Medium-full. One dominant move: a slow push-in on Moses as he turns back toward the sea, shallow depth of field.`,
    audio: `<wind rising, distant hooves in the corridor, the sea roar, thunder rolling>`,
    end: "Final frame: medium shot of Moses facing the corridor, staff raised in both hands." },

  { id: "23", srcDur: 5, dur: 5, chars: ["PHARAOH"], env: null,
    start: "Low angle inside the corridor: Pharaoh's chariot charges past and toward the camera, wheels throwing sheets of water straight into the lens, the wall beside it beginning to lean inward.",
    timeline: `0.0–3.0s: the chariot charges, water sheeting into the lens, Pharaoh lashing the reins, horses wild-eyed.
3.0–5.0s: the wall beside them starts to collapse — a curtain of water begins to fall from its crest as the chariot races on; Pharaoh looks up in terror.`,
    camera: `Low angle, wide. One dominant move: tracking alongside the charging chariot at its speed, water spraying onto the lens, natural motion blur.`,
    audio: `<hooves, wheels, sheets of water hitting the lens, a rising thunderous roar as the wall begins to fall>`,
    end: "Final frame: the chariot in frame with a wall of water beginning to fall behind it." },

  { id: "24", srcDur: 4, dur: 4, chars: [], env: "aerial",
    start: "@Image1 is the FIRST FRAME environment: the high aerial of the corridor — but now filled with the Egyptian chariot column instead of the Israelites, and both water walls leaning inward at their crests.",
    timeline: `0.0–1.5s: both walls tip inward and begin to fall toward each other over the chariots.
1.5–4.0s: the walls collapse and slam together over the column with a colossal white explosion of foam that races along the corridor's length, swallowing every chariot; the corridor vanishes under heaving water.`,
    camera: `High aerial wide. One dominant move: tracking downward toward the collapse, smooth, deep focus.`,
    audio: `<a colossal wave crash, deep bass impact, thunder, screaming horses and men swallowed by water>`,
    end: "Final frame: a churning white seam of foam where the corridor was, no chariots visible." },

  { id: "25", srcDur: 2, dur: 4, chars: [], env: null,
    start: "Underwater, medium shot, dark turbulent green-blue water full of bubbles and sand: an overturned chariot tumbling, its wheel spinning, a horse thrashing, debris and a bronze helmet sinking.",
    timeline: `0.0–4.0s: the chariot tumbles past the camera, the horse kicks in the murk, a soldier's body drifts, bubbles stream upward; the camera tumbles with the turbulence.`,
    camera: `Underwater medium shot. One dominant move: a tumbling, rolling camera caught in the turbulence, murky visibility, real underwater light shafts from above.`,
    audio: `<muffled underwater roar, bubbles, hydrophone rumble, a distant muffled impact>`,
    end: "Final frame: the chariot wheel spinning away into the murk." },

  { id: "26", srcDur: 2, dur: 4, chars: [], env: "aerial",
    start: "High aerial over the sea: the seam where the two water walls collided is a long line of white foam across the open sea, heaving, with no corridor left.",
    timeline: `0.0–4.0s: the foam seam spreads and thins as the swells roll over it; the sea becomes one heaving grey-green surface; spray drifts off the crests.`,
    camera: `High aerial wide, looking down at a diagonal. One dominant move: a slow drift forward over the seam, smooth, deep focus.`,
    audio: `<wind at altitude, the sea's roar settling, thunder rolling away>`,
    end: "Final frame: the foam line almost gone under rolling swells." },

  { id: "27", srcDur: 2, dur: 4, chars: [], env: null,
    start: "Underwater close-up of a submerged chariot wheel, spokes and rim, drifting down through bubbles in dark water, a leather rein trailing from it.",
    timeline: `0.0–4.0s: the wheel turns slowly as it sinks; bubbles stream past; the camera rotates around it, disorienting; a horse's legs drift through the murk behind.`,
    camera: `Underwater close-up. One dominant move: a slow disorienting rotation around the sinking wheel, shallow depth of field, murky light.`,
    audio: `<bubbles, muffled rumble, creaking wood>`,
    end: "Final frame: the wheel rotating away into darkness." },

  { id: "28", srcDur: 4, dur: 4, chars: [], env: null,
    start: "Ground level on the wet seabed inside the corridor, looking straight up: two enormous wave crests lean in from both sides, curling over the camera, a strip of storm sky between them.",
    timeline: `0.0–2.5s: the two crests lean further inward, foam pouring off them, the strip of sky narrowing.
2.5–4.0s: the crests meet directly above the camera and crash together, a wall of white water falling straight onto the lens.`,
    camera: `Ground level, extreme wide, looking straight up. The camera holds its position. Real water physics, natural motion blur, spray hitting the lens at the end.`,
    audio: `<a rising thunderous roar, then a colossal crash and impact as the water hits>`,
    end: "Final frame: white water filling the frame." },

  { id: "29", srcDur: 4, dur: 4, chars: ["MOSES"], env: null,
    start: "Wide shot from behind Moses on the far shore: he stands with staff raised, watching the corridor below where the sea walls are collapsing together, lightning flashing between them.",
    timeline: `0.0–4.0s: the walls fall together far below him in a white explosion; lightning flashes twice between the collapsing walls, lighting his mantle and hair; he stands unmoving, staff up; the camera pushes slowly toward his back.`,
    camera: `Wide, from behind. One dominant move: a slow push-in toward Moses' back and the collapse beyond him, deep focus.`,
    audio: `<the distant colossal crash, two thunderclaps with the lightning, wind, his stillness>`,
    end: "Final frame: Moses' back, medium-wide, the sea closing beyond him." },

  { id: "30", srcDur: 2, dur: 4, chars: [], env: null,
    start: "Underwater wide shot in deep blue water: chariots, horses and soldiers sinking slowly downward into the abyss, silhouetted against faint light from the surface far above.",
    timeline: `0.0–4.0s: bodies, horses and chariots drift downward through the blue, bubbles rising, kilts and reins trailing; the camera drifts slowly with them.`,
    camera: `Underwater wide. One dominant move: a slow drift downward alongside the sinking shapes, deep blue murk, light shafts from above.`,
    audio: `<deep muffled rumble, slow bubbles, silence beneath it>`,
    end: "Final frame: the shapes sinking away below into darkness." },

  { id: "31", srcDur: 9, dur: 9, chars: ["MOSES"], env: null,
    start: "Wide, low angle on the far shore: Moses stands at the waterline facing the sea, staff planted, as a massive wall of white foam surges up the beach toward him.",
    timeline: `0.0–3.0s: the foam wall surges up the sand toward Moses and breaks around his ankles, spray flying, his robe soaked at the hem; he does not move.
3.0–6.0s: the water levels out and slides back; the sea flattens into long calm swells; the roar drops to a wash.
6.0–9.0s: the clouds tear open and warm sunlight falls across him and the calm water; he lowers the staff slowly; a gull passes.`,
    camera: `Low angle, wide. One dominant move: a slow push-in toward Moses over the nine seconds, deep focus, smooth.`,
    audio: `<a surge of foam rushing and breaking, then water sliding back, settling to a gentle surf wash, wind dropping, a gull>`,
    end: "Final frame: Moses at the calm waterline in warm sunlight, staff lowered, medium-wide." },

  // ---- HAZEL H4 (after 31) ----
  { id: "H4", srcDur: 9, dur: 9, chars: ["HAZEL"], env: null, hazelSpeaks: true, pacing: "H4",
    start: "Wide, low angle on the far shore in warm post-storm sunlight: Hazel stands at the calm waterline, sand on her dress, braid loosened, the flat sea behind her, Israelites resting on the sand in the background.",
    timeline: `0.0–1.0s: Hazel looks out at the flat sea, then her eyes come to the lens.
1.0–5.5s: she speaks the first three sentences steadily to the lens; on "nobody chasing us comes out" her eyes go to the water for a beat and come back; on "Exodus, chapter fourteen" a small tired nod.
5.5–7.0s: a pause; she breathes out; her eyes stay on the lens.
7.0–9.0s: quietly, slowly, the sign-off, eyes on the lens; then a small, still smile; she holds.`,
    camera: `Low angle, wide tightening to medium. One dominant move: a slow push-in toward Hazel over the nine seconds (the same move as Moses' shore shot), deep focus becoming shallow as it tightens, smooth.`,
    gfb: `GAZE: the sea first, then the lens for the lines, the water for one beat on "comes out", back to the lens; the lens holds through the sign-off. FACE: drained and quiet — heavy eyelids at a fixed gaze target (the gaze target does not change), a small tired nod, a breath out, and a still, small smile only at the very end. BODY: standing at the waterline, weight on one hip, one hand holding her loosened braid, the other hanging; a slow blink before the sign-off; true stillness is the direction here.`,
    dialogue: `Dialogue language: English (American). Hazel speaks steadily and low, then very quietly for the last four words: {The sea goes back to where it was. Nobody chasing us comes out. Exodus, chapter fourteen.} (pause) {Hazel, out of time.}`,
    audio: `<gentle surf wash, light wind, distant tired voices, a gull>`,
    end: "Final frame: medium shot of Hazel at the waterline, eyes on the lens, small still smile, calm sea behind her." },

  { id: "32", srcDur: 10, dur: 10, chars: ["PHARAOH"], env: null,
    start: "Underwater tableau in slow motion, deep blue water with light shafts from above: Pharaoh sinks backward, arms reaching up toward the surface, nemes headcloth drifting, his chariot wheel and one of his dark horses floating beside him.",
    timeline: `0.0–10.0s: in slow motion, Pharaoh drifts downward, one hand reaching up in desperation, bubbles leaving his mouth, kohl-lined eyes open; the wheel turns slowly beside him; the horse's mane floats; light shafts sweep across them as they all sink slowly together.`,
    camera: `Underwater medium-wide. One dominant move: a floating slow orbital push-in around and toward Pharaoh, smooth, weightless. Slow motion is ON for this shot only.`,
    audio: `<deep muffled underwater rumble, slow bubbles, near-silence>`,
    end: "Final frame: close on Pharaoh's face and reaching hand, sinking into darkness." },
];

// ENV block trimmed to what the shot actually contains (a "no people" plate must not
// carry crowd/chariot descriptions — Seedance treats description as request).
const ENV_CORE = `THE RED SEA CROSSING, LATE BRONZE AGE: the sea has been split into a straight dry corridor of wet dark seabed (sand, shells, weed, shallow puddles) running to the horizon; on BOTH sides stand towering vertical walls of dark green-blue seawater, hundreds of feet high, churning white foam along their faces, spray drifting off their crests, sunlit mist inside the corridor.`;
const ENV_CROWD = `The Israelites are a column of thousands — men, women, children, elders, donkeys, goats, sheep, bundles — in undyed and earth-toned wool and linen tunics, fringed mantles and headscarves, each person different, extending past the frame edges and receding into the mist.`;
const ENV_ARMY = `The Egyptian force is hundreds of light two-horse wooden war chariots with drivers and archers in white linen kilts, leather and bronze scale armor, striped headcloths, bows and spears, dust and spray boiling from wheels and hooves, with more chariots receding in depth behind the nearest ones.`;
function envFor(clip) {
  const t = (clip.start + " " + clip.timeline).toLowerCase();
  const crowd = /israelite|crowd|families|mother|column of/.test(t);
  const army = /chariot|pharaoh|egyptian/.test(t);
  return [ENV_CORE, crowd ? ENV_CROWD : "", army ? ENV_ARMY : "", "The world continues beyond every frame edge."].filter(Boolean).join(" ");
}

// ---------- assembly ----------
function buildClip(clip) {
  const medias = [];
  const roles = [];
  let idx = 0;
  const imgTag = () => `@Image${++idx}`;

  if (clip.env && REFS.ENV[clip.env]) {
    medias.push({ value: REFS.ENV[clip.env], role: "start_image" });
    roles.push(`${imgTag()} is the FIRST-FRAME / environment plate: composition, the look of the water walls, sea, sky, light and grade. Do not redesign it; add only what the SCENE states.`);
  }
  if (clip.chars.includes("HAZEL")) {
    const first = idx + 1;
    for (const r of REFS.HAZEL) medias.push({ value: r.value, role: "image_references" });
    idx += REFS.HAZEL.length;
    roles.push(HAZEL_REF_ROLE(first, idx));
  }
  for (const npc of ["MOSES", "PHARAOH"]) {
    if (!clip.chars.includes(npc)) continue;
    const first = idx + 1;
    for (const r of REFS[npc]) medias.push({ value: r.value, role: "image_references" });
    idx += REFS[npc].length;
    roles.push(`@Image${first}–@Image${idx} control ONLY ${npc}'s identity, face, hair, wardrobe and props (full-preserve fidelity). Do not copy pose, background, lighting or camera angle from them.`);
  }
  let audioIdx = 0;
  if (clip.hazelSpeaks) {
    medias.push({ value: REFS.AUDIO.hazelVoiceLock, role: "audio_references" });
    roles.push(`@Audio${++audioIdx} is Hazel's VOICE-IDENTITY LOCK: take her voice timbre, pitch and accent from it for every word she speaks. Do not copy its pacing or its words.`);
    const p = REFS.AUDIO.pacing[clip.pacing];
    if (p) {
      medias.push({ value: p, role: "audio_references" });
      roles.push(`@Audio${++audioIdx} is Hazel's PACING reference for this clip: take ONLY the tempo, rhythm and delivery timing of her lines from it. Do not copy its timbre or voice.`);
    }
  }

  const parts = [];
  parts.push(`FORMAT: ${clip.dur} seconds, vertical 9:16, 1080p, single continuous take, real-time speed.`);
  parts.push(STYLE_PREFIX);
  if (roles.length) parts.push(`REFERENCE ROLES:\n${roles.join("\n")}`);
  if (clip.chars.includes("HAZEL")) parts.push(`STRICT IDENTITY RE-RENDER — the woman in this video MUST be the exact same person shown in her reference images; the references override this text. ${HAZEL_IDENTITY}\n\n${HAZEL_LOOK}`);
  if (clip.chars.includes("MOSES")) parts.push(`STRICT IDENTITY RE-RENDER — ${MOSES_LOCK}`);
  if (clip.chars.includes("PHARAOH")) parts.push(`STRICT IDENTITY RE-RENDER — ${PHARAOH_LOCK}`);
  parts.push(`STARTING STATE: ${clip.start}`);
  parts.push(`TIMELINE (cause always before reaction):\n${clip.timeline}`);
  if (clip.gfb) parts.push(`PERFORMANCE — ${clip.gfb}`);
  parts.push(`CAMERA: ${clip.camera}`);
  parts.push(`ENVIRONMENT: ${envFor(clip)}`);
  parts.push(`CONTINUITY (invariants first frame to last): the same people keep the same faces, clothing and props; the water walls keep the same scale and look; light direction constant within the shot.`);
  const audioLine = [clip.dialogue, `Audio includes ${clip.audio}.`].filter(Boolean).join(" ");
  parts.push(`AUDIO: ${audioLine}`);
  parts.push(`ENDING STATE: ${clip.end}`);
  parts.push(`LOCKS: ${REALISM_TAIL}`);

  return {
    index: CLIPS.indexOf(clip),
    params: {
      model: "seedance_2_5",
      mode: medias.length ? "omni_reference" : "t2v",
      duration: clip.dur,
      resolution: "1080p",
      aspect_ratio: "9:16",
      generate_audio: true,
      medias,
      prompt: parts.join("\n\n"),
    },
    _id: clip.id,
  };
}

const one = argv("--clip");
const batch = argv("--batch");
let out;
if (one) out = [buildClip(CLIPS.find((c) => c.id === one))];
else if (batch) { const b = Number(batch); out = CLIPS.slice((b - 1) * 12, b * 12).map(buildClip); }
else out = CLIPS.map(buildClip);
console.log(JSON.stringify(out, null, 2));

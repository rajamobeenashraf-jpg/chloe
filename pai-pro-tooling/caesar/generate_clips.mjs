#!/usr/bin/env node
// Episode 6 (Julius Caesar, Rome 44 BC) — Gate 2: the 11 video clips.
// Costume/hair locked by owner: the ORIGINAL round-1 stills (plain
// undyed-wool stola + loose hair, per CHARACTER_LOCK v4 as-is — no
// premium dye, no updo). Script source: episodes-5-9-scripts.md Episode 6.
//
// Calls PAI Pro's raw video pipeline directly (CreateAssetGroup/CreateAsset
// refs -> video-generation submit -> poll), same headless-workaround pattern
// as generate_costume_stills.mjs.

import fs from "node:fs/promises";
import path from "node:path";
import { uploadReferenceUrl } from "../../server/pai_assets_client.js";
import { submitVideo, pollVideo } from "../../server/pai_video_client.js";

const REF_HOST = "https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB";
const REF_URLS = [
  `${REF_HOST}/cdde55af-979f-4410-9d84-a9e1c77cdfde.png`, // turnaround sheet
  `${REF_HOST}/ef2a1822-8d93-4cbd-a2aa-071412934b5e.png`, // face-detail sheet
  `${REF_HOST}/f8a3e22d-0e3c-4f63-8cf2-fb64e9f215ec.png`, // clip 9 aftermath frame
  `${REF_HOST}/d35989c6-3cf2-4d1f-b8a8-f2fd75bf3438.png`, // clip 3 costume frame
  `${REF_HOST}/d11009b5-3b62-4841-ad2b-4a0f700b2569.png`, // clip 5 irony frame
];

// Root-cause fix for Episode 6 clip 9 (Gemini QC + visual re-check both
// caught Wild West bleed-through — a full scene/costume break the first
// time, a corset/holster/saloon-backdrop drift the second time even after
// the continuity break itself was fixed): the default ref set includes
// `f8a3e22d`, labeled "clip 9 aftermath frame" in CHARACTER_LOCK.md — it's
// a chaos-aftermath still from the ORIGINAL Wild West episode's own clip 9.
// This episode's clip 9 is also a chaos-aftermath beat, and the thematic
// match between the prompt and that one reference image's content appears
// to pull its Wild-West costume/setting through harder than the other
// refs. Swapped for a neutral, non-"aftermath" movie frame instead.
const REF_URLS_NO_AFTERMATH = [
  `${REF_HOST}/cdde55af-979f-4410-9d84-a9e1c77cdfde.png`, // turnaround sheet
  `${REF_HOST}/ef2a1822-8d93-4cbd-a2aa-071412934b5e.png`, // face-detail sheet
  `${REF_HOST}/32458af5-8967-490c-a205-2926c6fb2008.png`, // neutral movie frame (no aftermath/action theme)
  `${REF_HOST}/d35989c6-3cf2-4d1f-b8a8-f2fd75bf3438.png`, // clip 3 costume frame
  `${REF_HOST}/d11009b5-3b62-4841-ad2b-4a0f700b2569.png`, // clip 5 irony frame
];

const IDENTITY = `The EXACT same woman shown in the reference images — the character sheets and movie frames all depict ONE single identical person. Render precisely: her slimmer more sculpted face with defined cheekbones and a clean narrower jawline; her large doe-like almond light-hazel eyes; her bold thick dark-brown high-arched eyebrows; her full lips with glossy nude-caramel tint; her hairline and long light-brown bronde balayage hair with center parting; her warm golden-tan skin tone with natural visible freckles and subtle redness — NOT fair-ivory or porcelain; her body proportions and figure; her age (early twenties). No beautification, no redesign, no changes between this and the references. She must read as a real, physically-photographed human being: natural skin texture with visible pores, fine vellus hair, and authentic micro-imperfections; subtle natural asymmetry; real weight and movement in her hair and clothing. She must NEVER look like an AI generation, a 3D render, a smoothed/filtered/airbrushed image, or a synthetic "plastic AI face" — 100% natural, human, and believable is the single most important requirement of every generation, non-negotiable.`;

const MATTE = `Skin finish is MATTE, not glossy or dewy — zero highlighter shine, zero glam sheen, zero soft-focus glow on the face or skin (her lips alone keep their natural glossy nude-caramel tint per her locked identity — that is lip color only, not a face-gloss effect). Lighting is hard, overcast or directional natural light with real shadow falloff — NOT flattering studio softbox beauty lighting. Skin texture, pores, faint blemishes and uneven tone must read clearly at normal viewing size, not just on close inspection. Color grade is muted, desaturated, unpolished — a raw historical-documentary or photojournalism feel, NOT a fashion/beauty editorial feel. This is a candid photograph of a real woman having a hard day in Rome, 44 BC — not a posed glamour shoot, not an influencer photo.`;

const REALISM = `Documentary photograph, RAW 35mm Kodak Portra 400 color, natural photographic lighting, visible skin pores and fine vellus facial hair, natural subtle human imperfections, believable anatomy, real fabric texture. NOT 3D render, smoothed-skin filter, beauty retouch, plastic skin, AI-generated look, synthetic/artificial appearance.`;

const CONTINUOUS = `Single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take.`;

const SELFIE = `Handheld selfie-vlog camera framing — she holds the camera at arm's length or it floats at a natural vlogging distance in front of her, talking directly to the lens for most of the shot. No camera, rig, GoPro, strap, or mount ever visible.`;

const BG_ANACHRONISM_GUARD = `Every background Roman is dressed authentically for 44 BC — togas, tunics, stolas, period hairstyles and jewelry only. No anachronistic clothing, accessories, hairstyles, tattoos, modern objects, or modern materials visible anywhere in the background.`;

// Added after the owner caught an unmotivated speech-rate acceleration in
// clip 1 (confirmed via Gemini eyes on all 11 clips: clips 1, 8, and 11 —
// the three uninterrupted solo-monologue clips with no back-and-forth
// dialogue or physical business to naturally break up delivery — all showed
// the identical pattern: measured pace for the first few seconds, then an
// unmotivated speedup with words running together for the rest of the clip).
// Scoped to these three clips specifically, not applied globally, since the
// other 8 clips' pacing was independently confirmed clean.
const PACE_HOLD = `Her measured, deliberate speaking pace established at the start of this clip holds STEADY for the ENTIRE clip, start to finish, with no exceptions — it does not speed up, rush, or quicken at any point partway through. If her rhythm drifts at all as the clip continues, it drifts slower or stays level, never faster. Every word throughout the full duration is clearly separated and unhurried, the same measured rate all the way to the final word, not just in the opening seconds.`;

// Added after Gemini QC (post-generation review) confirmed clip 1 baked a
// wrong on-screen date ("44 AB" instead of "44 BC") into its own pixels as
// an auto-caption, and clip 7 baked garbled mirrored pseudo-lettering onto
// the litter's front plaque — the same PAI video-model quirk documented for
// Episode 1's clip 1 in creative-direction.md §11 round 3. Scoped narrowly
// to caption/signage-style text (not scroll/document handwriting texture,
// which several other clips legitimately need) and applied only to the two
// clips that actually showed the problem.
const NO_BAKED_TEXT = `Pure video footage with NO UI-style on-screen text rendered into the video itself — no burnt-in captions, no subtitles, no date stamps, no title cards. No signs, plaques, banners, or inscriptions with lettering anywhere in frame, on any prop, cart, litter, or building surface — any object that would historically carry an inscription should show as a plain unmarked surface instead. (Handwriting-textured documents/scrolls elsewhere in this episode are a separate, allowed case — this rule is specifically about captions and signage.)`;

// Added after round-1 self-QC found St. Peter's Basilica's dome in clip 1's
// skyline and the modern excavated/ruined Forum archaeological park (with
// tourist-path lighting) in clip 11's — both wide vista shots drifted toward
// present-day Rome instead of the intact, functioning 44 BC city. Applied
// to any clip with a skyline/wide-vista background.
const REPUBLIC_ROME_GUARD = `This is the fully intact, functioning, INHABITED city of Republic-era Rome in 44 BC — every building complete with its roof, nothing ruined, nothing excavated, nothing missing. The skyline shows ONLY generic, unbranded Republic-era architecture invented for this scene: rectangular and square temples with columned porticos, triangular pediments, and flat or gabled roofs; insulae apartment blocks; basilicas; red-tile and terracotta roofing. NO dome, NO rotunda, NO circular building with a hemispherical or coffered roof of ANY kind or size, anywhere in the frame — round temples in this era were small open colonnaded tholoi with a simple conical roof, never a large dome. Critically: the skyline must NOT resemble any specific real, famous, or recognizable monument — invent generic period architecture rather than reproducing a real identifiable building, and in particular it must not read as the Pantheon (a 2nd-century-AD building, does not exist yet), St. Peter's Basilica, the Colosseum, or any other landmark a viewer could name. No modern-style pedestrian railings, fencing, paved park walkways, barrier ropes, or path lighting anywhere.`;

// Wardrobe by act — established clip 2, persists (continuity), degrades
// through the day per the script's own stage directions.
const WARDROBE_INTACT = `WARDROBE (locked, do not change): a plain undyed pale-wool Roman stola, ankle-length, cinched under the bust with a simple cord belt; a rectangular cream palla (shawl-wrap) draped over one shoulder; bare feet in simple leather sandals; no jewelry beyond a plain iron fibula pin; her hair down and loose, natural, unstyled by midday heat.`;
const WARDROBE_PALLA_SLIPPING = `WARDROBE (locked, do not change): the same plain undyed pale-wool stola as always, cord belt; the rectangular cream palla slipping loose off one shoulder as she moves, unpinned and sliding; bare feet in simple leather sandals; plain iron fibula pin; her hair down and loose, a little more windblown/disheveled than earlier in the day.`;
const WARDROBE_NO_PALLA = `WARDROBE (locked, do not change): the same plain undyed pale-wool stola as always, cord belt — the palla is GONE (torn away in the crowd surge, per story continuity), just the stola now; bare feet in simple leather sandals; her hair down and loose, visibly disheveled from the crowd and the day's heat.`;

const SPURINNA = `an elderly Roman soothsayer (haruspex), grey-bearded, plain dark undyed toga, gaunt and weathered, a haunted knowing stillness to him`;
const ARTEMIDORUS = `an anxious Greek scholar in his fifties, plain pale-cream toga, grey-streaked hair, visibly trembling hands, clutching a papyrus scroll tightly to his chest — same man, same dress, in every clip he appears`;
const POSCA_VENDOR = `a middle-aged Roman street vendor behind a stone counter, plain brown tunic with a vinegar-stained apron, weathered hands, calm and unbothered`;
const CAESAR_GLIMPSED = `Julius Caesar, glimpsed at a distance — an older Roman man in his fifties, laurel wreath, a toga with a purple border, dignified and composed, surrounded by lictors carrying fasces and a crowd of senators`;

function prompt(parts) {
  return parts.filter(Boolean).join("\n\n");
}

const CLIPS = [
  {
    n: 1,
    duration: 11,
    wardrobe: WARDROBE_INTACT,
    scene: `LINEAR OPEN. Dawn in the Forum of Rome, street level, soft early gold light raking across the paving stones, the city waking up around her — vendors pulling open stall shutters and setting out goods, a handful of citizens and a pair of senators in togas crossing the open space on their way somewhere, temple columns and porticos catching the first sun, smoke from distant cookfires drifting past the rooftops. ${REPUBLIC_ROME_GUARD} ${NO_BAKED_TEXT} She stands in the middle of this waking street, ${SELFIE}, the real morning crowd moving past and around her in the background the entire time — not staged, not paused for her, life continuing at its own pace. She speaks directly to the lens, calm but with an undertone of dread building through the line — this is the episode's stated-doom hook, delivered plainly, not melodramatically: "Rome. March 15th, 44 BC. The Ides." Beat — a pair of senators in togas cross behind her, unhurried, unremarkable to anyone but her. "Sixty senators are walking through this city right now with knives hidden under their togas." Beat, she steps slightly closer to the lens, her expression tightening: "By noon, Caesar is dead." Longer beat, quieter, the dread fully landing: "And me?" She glances once at the crowd moving past her, then back to the lens. "I'm right in the middle of it." ${PACE_HOLD} ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: dawn Forum street ambience — waking-city murmur, vendors setting up stalls, footsteps and sandals on stone, a distant cart wheel. No music yet.`,
  },
  {
    n: 2,
    duration: 8,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    scene: `A cramped street-stall on a Forum-adjacent street, late morning, hard flat noon-approaching sun, neutral-white marble buildings behind her, a small polished-bronze hand mirror propped on the stall counter. ${SELFIE} She is mid-wrestle with the palla as it slides off her shoulder while she's still talking — this is embedded in her ongoing motion, not a separate event: as she re-pins the palla with one hand, she keeps talking, mildly exasperated but making it funny for the lens: "One rectangle. Six meters." She tugs the fabric taut. "Zero pins where I need pins." The palla slips again immediately as she reaches for the pin. "They invented CONCRETE before the safety pin." She jabs the pin in, holds the fabric down with her free hand like she's daring it to move: "Stay." Beat. It shifts again anyway. "STAY." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: street-stall ambience, distant Forum crowd murmur, a cart wheel somewhere nearby.`,
  },
  {
    n: 3,
    duration: 10,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    scene: `A posca counter on the same street, noon, hard overhead light. Behind the stone counter: ${POSCA_VENDOR}, ladling a vinegar-wine mixture into a clay cup. ${SELFIE} She takes the cup, raises it to the lens ("okay, when in Rome —"), and drinks. Per physical-state pacing: she STOPS talking the instant she tastes it — full stop, wide-eyed, blinking, throat working as she swallows before she says a single word. Only once she's swallowed does she speak, flat with disbelief: "It's vinegar. Why is it vinegar?" *[Posca Vendor]*, not looking up, ladling the next cup: "It kills what lives in the water." She sets the cup down slowly: "What lives in the water?" *[Posca Vendor]*, still pouring, utterly unbothered: "Best not to know, domina." She turns to the lens, deadpan aside: "3/10. Builds character, dissolves teeth." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: liquid pouring, clay cup on stone, street ambience continues under the dialogue.`,
  },
  {
    n: 4,
    duration: 10,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    scene: `A public fountain on the same street, noon, hard light, water trickling. Two Roman men stand near the fountain — one anxious, one bored and unbothered, both in plain citizen togas. ${SELFIE} She approaches them directly, initiating (§12 — she asks, she doesn't wait to be told): "Is he coming or not?" *[Anxious Roman]*, low, urgent: "He is not. Calpurnia dreamt him dead." *[Second Roman]*, bored, examining his own fingernails, not looking up: "Decimus has gone to fetch him. One does not decline Decimus." She goes completely still for a full two seconds — silent reaction face straight into the lens, the news landing before she has words for it. Then, quiet aside, deadpan: "He said that like a weather report." Small humorless breath. "Cloudy, with a chance of coup." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: fountain water trickling, murmured street conversation in the background, footsteps on stone.`,
  },
  {
    n: 5,
    duration: 8,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    scene: `A small stall further down the street, noon, deep shade under an awning contrasting the hard sun outside it. Behind it stands ${SPURINNA}, motionless, watching the street. ${SELFIE} She stops in front of him, her energy dropping — this is a quiet, weighted beat, not a comedic one. She says, carefully: "You told him. Beware the Ides." *[Spurinna]*, not blinking, voice flat and certain: "The Ides are not yet ended." A beat of real unease passes between them — two people who both know something no one else does. She looks back toward the street, then to the lens, subdued: "...Right. I'm going to go stand in the road." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: ambient street noise drops slightly under the awning's shade — a small, deliberate quiet around this exchange.`,
  },
  {
    n: 6,
    duration: 12,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    scene: `A crowded colonnade near the Forum, noon, dense crowd of Roman citizens filling the space — a real crush, dozens of background figures, not a handful (§10 population must match "crush"). ${ARTEMIDORUS} is walled off in the crowd, hands shaking, scroll clutched to his chest, unable to move forward. She spots him and immediately acts (§12): she wedges herself into the crowd shoulder-first, elbow leading, physically making a path — "Make way — petitions for Caesar!" — reaching back to grip Artemidorus's arm and pull him along behind her through the gap she's making. She moves FORWARD in her direction of travel the whole time, NOT walking backward, NOT staying face-on to the lens while moving — the camera swings and re-angles naturally as she pushes through, briefly showing her profile as she twists through the crowd, swinging back to face her once there's room to talk. The palla slips off her shoulder again in the crush, unremarked — she doesn't stop for it, too focused on getting Artemidorus through. Once through, facing him, she says, urgent and practical: "In my time, when a letter can't wait, we mark it." She mimes a stripe with her finger. "Red. Means read-this-FIRST." He pulls a rough fist-sized lump of dark red-brown mineral clay from a fold of his robe — small, irregular, and uneven, the color and texture of dried terracotta or a raw chunk of rust-colored stone, entirely handheld with no straight edges and no manufactured form. He presses and rubs this lump directly against the scroll's outer fold with his thumb, leaving a single straight smeared red-brown mark, one unbroken diagonal stripe in one direction only — his thumb is stained red-brown afterward, deadly serious, hands still shaking: *[Artemidorus]*: "Red. Read first. A fine system." During this whole exchange only her hands and Artemidorus's own hands are near the scroll and his chest — the crowd keeps a natural respectful gap around this close, private moment between the two of them. ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: dense crowd noise, overlapping voices, cloth rustling, sandals on stone — loud and close.`,
  },
  {
    n: 7,
    duration: 13,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `${NO_BAKED_TEXT} The litter's wood panels are plain and unmarked, no carved or painted lettering anywhere on it. The street outside the Curia, noon, a dense crowd surging around an approaching litter — ${CAESAR_GLIMPSED} visible within it, petitioners raining scrolls and pleas toward him, real crowd scale (§10), lictors pushing the crowd back. She and ${ARTEMIDORUS} are pressed at the edge of the crush. Artemidorus forces his way to the litter and pushes the red-striped scroll directly into Caesar's hand, desperate: *[Artemidorus]*: "Read it yourself — ALONE!" She calls out over the heads of the crowd, straining to be heard, pointing at the scroll: "THE RED ONE! RED MEANS FIRST—" Her shout is cut off physically, not just interrupted by timing — a lictor's forearm sweeps across, pushing her and Artemidorus back from the litter as it keeps moving; Caesar, still holding the scroll, passes it without looking at it to a secretary walking alongside him, who tucks it under an armful of others, unopened. Her face falls — a real, visible drop, stomach-drop reaction — as she watches it disappear into the stack. Quiet, to the lens, bitter: "The sheriff in 1875 at least tipped his hat." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: crowd noise peaks — overlapping shouted pleas, lictors barking for space, sandals and cloth, the litter's creak.`,
  },
  {
    n: "7b",
    duration: 9,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `LINEAR CONTINUATION of the procession passing through the crowd. Same street outside the Curia, noon, the crush of petitioners and lictors still pressing around Caesar's litter as it moves past where she and Artemidorus stand, moments after the scroll was swept away unread. She doesn't hesitate (§12): she calls out, urgent and unplanned, cutting through the noise of the crowd, ${SELFIE} turning to catch him in frame as he passes close: "You should take your guards today." For one beat, against everything the lictors are trying to do, Caesar stops — an older Roman man in his fifties, laurel wreath, a toga with a purple border, dignified and composed, turning his head to actually look at her, genuinely present for the first time, not a distant glimpsed figure anymore. A flicker of real amusement crosses his face at the boldness of a stranger calling out to him directly — not alarm, not annoyance, something almost warm. He answers her directly, measured and unhurried, dignified even in this brief roadside exchange: "I've had guards enough for one lifetime." A small, genuine, tired smile. "Better to die once than live afraid of it." Both of them speak at a natural, clearly measured pace throughout, start to finish — hers quick with urgency but every word distinct, his slower, warm, unhurried, dignified — neither rushes, neither drags. The moment breaks as quickly as it opened — a lictor's arm and the press of the crowd close the gap, sweeping him onward toward the doors, already gone, already folded back into the procession. She's left standing there, having gotten the one thing the scroll never did — a real answer — and it changed nothing. ${REPUBLIC_ROME_GUARD} ${NO_BAKED_TEXT} ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: the ongoing crowd/procession noise dips slightly right around the two of them, both voices clear and close over the background noise, then the crowd swallows the moment again as he's swept back into the procession.`,
  },
  {
    n: 8,
    duration: 8,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `The base of the Curia steps, noon, the crowd thinning here as Caesar's group climbs toward the doors. ${CAESAR_GLIMPSED} ascends the steps in the middle distance; near the doors, one senator in a formal toga draws Mark Antony — a strong, broad-shouldered Roman in his thirties, also in formal dress — aside into conversation, visibly delaying him, both men still in frame in the background. ${SELFIE} She watches this from a distance, close to the lens, her voice dropping to a near-whisper as she reads what she's seeing in real time: "And the one man big enough to stop it—" she watches Antony get drawn further aside, out of earshot of the doors, "—just got invited to a very convenient chat." ${PACE_HOLD} ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: ambient crowd noise recedes slightly, footsteps on stone steps, wind.`,
  },
  {
    n: 9,
    duration: 10,
    wardrobe: WARDROBE_PALLA_SLIPPING,
    refs: REF_URLS_NO_AFTERMATH,
    scene: `THE PIVOT — zero jokes from here forward, tone shifts hard. Same area near the Curia doors, noon. She is mid-sentence to the lens when the sound erupts from inside the building — embedded in the ongoing moment, not a cut to a new scene: as she's still speaking, a roar of shouting and chaos bursts out from the doors behind her, and she reacts to it live, turning mid-word. A crowd of senators burst out through the doors white-faced, togas streaming and blood-marked, a real crowd of them (§10), pigeons blasting off the rooftop in a startled flock, the panic wave rolling out through the crowd toward her. ${ARTEMIDORUS} has been standing at her side this entire time, in the street beside her — apart from and untouched by the group bursting through the doors, not among them, not emerging from the building. His pale-cream toga is clean and unmarked, no blood anywhere on him — he was never inside. He still grips his papyrus scroll tightly to his chest even now, unable to let go of it even in the panic. Shallow depth of field throughout: she, Artemidorus, and the nearby fleeing crowd stay sharp and in focus; any large temple or building far in the distance beyond them is soft, out-of-focus background blur — an impression of scale and stone, no distinct legible facade, columns, or inscriptions at that distance. She acts immediately (§12): she wraps both arms around Artemidorus and hauls him bodily into a doorway alcove out of the flow of the stampeding crowd, positioning her own body between him and the open street, gathering him protectively against the wall rather than shoving him — clear shelter, not restraint. His face shows real fear breaking into recognition and trust as he registers it's her, someone he knows, protecting him — not alarm at a stranger's grip. In the chaos her palla tears free from her shoulder and vanishes into the fleeing crowd — she doesn't even glance at it, entirely focused on holding Artemidorus safe. No dialogue this clip — only sound, faces, and physical action. THE ENTIRE CLIP, START TO FINISH, IS ONE UNBROKEN REAL-WORLD MOMENT: she and Artemidorus remain on this exact Roman street outside the Curia doors for the full duration, in her exact same stola costume throughout, filmed as a single unedited continuous phone recording — the camera never leaves this location, this moment, or this century, all the way to the last frame. ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: the roar — screaming, overlapping panicked shouting, sandals slapping stone at a run, pigeons' wingbeats, cloth tearing. Music, if any was playing under the episode to this point, cuts dead here and does not return.`,
  },
  {
    n: 10,
    duration: 8,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `The same street, minutes later, noon light now flat and drained-looking. The crowd has scattered — the Forum-adjacent street is emptying, dropped petitions and scrolls blowing across the paving stones in the wind, a few distant figures still running. ${SELFIE}, her energy is completely different now — quiet, hollowed out, no performance left in her voice. She crouches and picks up one scroll from the gutter — the one Artemidorus marked earlier: a single straight red-brown smeared stripe, one continuous diagonal line in one direction only, dropped and forgotten. She turns it over in her hands, staring at that one stripe. Quiet, barely audible, no theatricality: "He held it." Beat. "He held the warning in his HAND." Longer beat, her voice cracking slightly: "He just never opened his hand." ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: wind, scattering papyrus/parchment across stone, distant and sparse voices far off. No music.`,
  },
  {
    n: 11,
    duration: 13,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `Dusk, a quiet elevated spot overlooking the Forum. TIGHT chest-up close framing on her the entire time — she fills most of the frame. Whatever city is visible behind her is small in frame, distant, and rendered with a shallow depth of field / soft bokeh blur, so no individual building is sharp or identifiable — just soft warm-toned shapes and lights in the dusk haze, an impression of a city rather than a legible skyline. Warm fading light, long shadows, the city settling into evening, a few soft warm lamp-glows visible as indistinct blurred points of light, not sharp architecture. ${SELFIE}, she speaks slowly, in a eulogy register — measured, unhurried, no jokes, this is the start of the episode's emotional landing, continuing into the next clip: "They did it to save the Republic." A small beat. "It dies in there with him — what comes next is emperors, for five hundred years." A small, tired almost-laugh with no humor in it: "And they're renaming a month for him. You've said his name every July of your life." Her pace holds completely steady from the first word to the last, start to finish, never speeding up or rushing at any point no matter how much she says — every word clearly separated, genuinely slow, closer to a spoken eulogy than ordinary conversation. ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: evening ambience settling in, wind, the city's noise fading into the distance. No music.`,
  },
  {
    n: "11b",
    duration: 10,
    wardrobe: WARDROBE_NO_PALLA,
    scene: `LINEAR CONTINUATION of the previous clip — same dusk spot overlooking the Forum, moments later, the light a little further gone than before, shadows longer, the warm lamp-glows a little brighter against the darkening sky, same shallow depth of field on the distant skyline (no individual building sharp or identifiable). TIGHT chest-up close framing on her the entire time, matching the previous clip exactly. ${SELFIE}, still in the same eulogy register — measured, unhurried, no jokes — but visibly more emotional than any prior clip in the episode: her eyes are glassy and welling with real tears along the lower lash line, catching the warm fading light, her jaw and mouth held tight with the effort of not fully breaking down. She looks away toward the darkening Forum for a moment, blinking hard against it, then back to the lens, her voice quieter and thinner than before, tightening with emotion but still clear and unhurried: "Twenty-three wounds. Only one of them was necessary." The tears do not stream — most of the emotion stays held at the brim, glistening, not flowing — but at most one or two tears break free partway through the clip and slide slowly down her cheek, nothing more, no full crying, no sobbing. Then the longest pause of the whole episode — she says nothing at all for a real, uncomfortably long stretch, just breathing unsteadily, visibly holding herself together, before she speaks again. Barely above a whisper, the softest line in the entire episode, her voice audibly thick: "Hazel — out of time." She holds completely still, saying nothing further, eyes still glassy, as the light keeps fading to the end of the clip. Her pace on both lines is unhurried and steady — if her rhythm drifts at all across the clip, it drifts slower, never faster. ${BG_ANACHRONISM_GUARD}`,
    sound: `Sound: evening ambience, quieter now, wind, the city's noise almost gone. No music, or only the faintest score entering right at the very end.`,
  },
];

async function main() {
  const outDir = path.join(process.cwd(), "assets");
  await fs.mkdir(outDir, { recursive: true });

  const allRefUrls = [...new Set([...REF_URLS, ...REF_URLS_NO_AFTERMATH])];
  process.stdout.write(`Uploading ${allRefUrls.length} reference images as PAI assets...\n`);
  const assetIdByUrl = new Map();
  for (const url of allRefUrls) {
    const id = await uploadReferenceUrl(url, "image");
    assetIdByUrl.set(url, id);
    process.stdout.write(`  ref -> ${id}\n`);
  }
  const imageAssetIds = REF_URLS.map((u) => assetIdByUrl.get(u));

  const manifest = [];

  // Optional: `node generate_clips.mjs 1 6 11` regenerates only those clip
  // numbers (used for targeted self-QC fixes) instead of the full batch.
  // Compared as strings so inserted non-numeric ids (e.g. "7b") also work.
  const requestedClips = process.argv.slice(2);
  const clipsToRun = requestedClips.length
    ? CLIPS.filter((c) => requestedClips.includes(String(c.n)))
    : CLIPS;

  // Submit up front (async), then poll concurrently — polling is
  // the slow part (up to 30 min ceiling each) and each clip's poll is
  // independent, so this is far faster wall-clock than submit+wait serially.
  process.stdout.write(`\nSubmitting ${clipsToRun.length} clips...\n`);
  const submissions = [];
  for (const clip of clipsToRun) {
    const fullPrompt = prompt([
      IDENTITY,
      MATTE,
      clip.wardrobe,
      CONTINUOUS,
      SELFIE,
      `CLIP ${clip.n} SCENE: ${clip.scene}`,
      clip.sound,
      REALISM,
      `Vertical 9:16 framing throughout.`,
    ]);
    try {
      const clipImageAssetIds = clip.refs
        ? clip.refs.map((u) => assetIdByUrl.get(u))
        : imageAssetIds;
      const { taskId } = await submitVideo({
        prompt: fullPrompt,
        duration: clip.duration,
        aspectRatio: "9:16",
        resolution: "720p",
        generateAudio: true,
        imageAssetIds: clipImageAssetIds,
      });
      process.stdout.write(`  clip ${clip.n} submitted -> task ${taskId}\n`);
      submissions.push({ clip, taskId, promptSent: fullPrompt });
    } catch (e) {
      process.stdout.write(`  !! clip ${clip.n} SUBMIT FAILED: ${e?.klass || ""} ${e?.message || e}\n`);
      manifest.push({ clip: clip.n, status: "submit_failed", error: String(e?.message || e), klass: e?.klass });
    }
  }

  process.stdout.write(`\nPolling ${submissions.length} clips to completion (this can take a while)...\n`);
  const results = await Promise.all(
    submissions.map(async ({ clip, taskId, promptSent }) => {
      try {
        const { videoUrl, durationSeconds } = await pollVideo(taskId, {
          onProgress: ({ status, elapsedSec }) => {
            process.stdout.write(`    clip ${clip.n} [${taskId}] ${status} @ ${Math.round(elapsedSec)}s\n`);
          },
        });
        process.stdout.write(`  clip ${clip.n} DONE (${Math.round(durationSeconds)}s wall) -> ${videoUrl}\n`);
        const res = await fetch(videoUrl);
        const bytes = Buffer.from(await res.arrayBuffer());
        const outPath = path.join(outDir, `clip${clip.n}.mp4`);
        await fs.writeFile(outPath, bytes);
        return {
          clip: clip.n, status: "ok", taskId, videoUrl, file: outPath, bytes: bytes.length,
          duration_requested: clip.duration,
        };
      } catch (e) {
        process.stdout.write(`  !! clip ${clip.n} FAILED: ${e?.klass || ""} ${e?.message || e}\n`);
        return { clip: clip.n, status: "failed", taskId, error: String(e?.message || e), klass: e?.klass };
      }
    })
  );
  manifest.push(...results);

  // Merge into the existing manifest on a targeted re-run so a `1 6 11`
  // fix round doesn't wipe out the other 8 clips' entries.
  const manifestPath = path.join(outDir, "clips_manifest.json");
  let finalManifest = manifest;
  if (requestedClips.length) {
    try {
      const prior = JSON.parse(await fs.readFile(manifestPath, "utf8"));
      const byClip = new Map(prior.map((r) => [r.clip, r]));
      for (const r of manifest) byClip.set(r.clip, r);
      finalManifest = [...byClip.values()];
    } catch {
      // no prior manifest to merge with — fall through with just this run's results
    }
  }
  finalManifest.sort((a, b) => String(a.clip).localeCompare(String(b.clip), undefined, { numeric: true }));

  await fs.writeFile(manifestPath, JSON.stringify(finalManifest, null, 2));
  process.stdout.write("\nDone. Manifest written to assets/clips_manifest.json\n");
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});

// Episode 4 — "I Joined the Gold Rush of 1849" — 12 clip prompts.
// Built from episodes-2-4-scripts.md (approved) under every standing rule in
// creative-direction.md §6-§12. Shared blocks are byte-identical across clips.

export const IDENTITY = `She is the EXACT same woman shown in the reference images — the character sheets and movie frames all depict ONE single identical person. Render precisely: her slimmer more sculpted face with defined cheekbones and a clean narrower jawline; her large doe-like almond light-hazel eyes; her bold thick dark-brown high-arched eyebrows; her full lips with glossy nude-caramel tint; her hairline and long light-brown bronde balayage hair with center parting; her warm golden-tan skin tone with natural visible freckles and subtle redness — NOT fair-ivory or porcelain; her body proportions and figure; her age (early twenties). No beautification, no redesign, no changes between this and the references.`;

export const GRIT = `On-location physical condition (overrides any studio polish, keep identity identical): her skin is fully MATTE — no gloss, no shine, no dewy highlight, no makeup look; her lip tint is worn away to matte, lips slightly wind-chapped; days of outdoor work show — faint sunburn across the nose and cheekbones, dirt worked into the pores and knuckle creases, a little grease at the hairline, flyaway frizz, faint dark tiredness under her eyes; fingernails short with dirt under them. Weathered, gritty, unglamorous frontier realism.`;

export const CAMERA = `Vertical 9:16 handheld selfie vlog footage: she holds the camera herself at arm's length with the lens on her face, first-person vlog grammar, slight natural handheld shake. Single continuous unbroken shot, one camera angle throughout, no cuts, no scene changes, real-time continuous take.`;

export const NATURAL = `Documentary realism, RAW 35mm film texture, natural photographic lighting, visible skin pores and fine vellus facial hair, natural subtle human imperfections, believable anatomy, real fabric texture. She must look like a completely real, natural human being — NOT 3D render, NOT smoothed-skin filter, NOT beauty retouch, NOT plastic skin, NOT an AI-generated look, NOT influencer glam — a real tired working woman on a real frontier. No on-screen text, no captions, no subtitles, no watermarks anywhere in the frame.`;

export const GRADE_DAY = `Color grade: cold overcast Sierra Nevada river-canyon light, green-grey palette, muted desaturated tones, damp air, soft diffuse daylight — no warm amber tones.`;
export const GRADE_NIGHT = `Color grade: cold blue-grey night, muted desaturated tones, damp air, the darkness broken only by scattered warm handheld-torch pools of light — the same cold green-grey Sierra palette as daytime, at night.`;
export const GRADE_DUSK = `Color grade: cold fading dusk over the Sierra Nevada river canyon, green-grey palette sliding into blue-grey twilight, muted desaturated tones, damp air — no warm amber tones.`;

export const WARDROBE_WORK = `She wears her 1849 gold-rush work kit: a mud-caked faded red-brown flannel work shirt with sleeves rolled to the forearms, rough canvas work trousers tucked into heavy scuffed brown leather work boots, a grey felt slouch hat, her long hair loosely tied back low with strands escaping, wet mud caking her boots and trousers to the knees, a faint smear of dried mud on one cheek.`;
export const WARDROBE_ARRIVAL = `She wears her 1849 overland-trail travel outfit: a plain dove-grey wool travel dress with fitted buttoned bodice and long sleeves, a dark wool shawl around her shoulders, sturdy brown lace-up ankle boots, hair down with the center parting, a small canvas satchel across her body, the dress hem dusty from travel.`;

export const AMOS = `Amos, a free Black miner in his forties, broad-shouldered, short grey-flecked beard, patched faded blue wool shirt, leather suspenders, kind weathered face`;
export const LI = `Li, a Chinese miner in his twenties, slim build, wide-brimmed woven straw hat, dark cotton tunic, quick precise movements`;

export const TENTS = `A-frame canvas wall tents (NOT conical tents, NOT teepees)`;

export const CLIPS = [
  {
    n: 1, duration: 7, grade: "night", wardrobe: "work",
    label: "cold open — she stops the hanging vote (flash-forward to clip 10's night)",
    scene: `Night in a Sierra Nevada mining camp: a dense angry crowd of at least twenty rough miners packed between ${TENTS}, many holding burning torches, all roaring "ROPE 'EM! ROPE 'EM!" over each other. From the very first frame she is already shoving her way forward through the shouting bodies with the camera in one hand, shoulder-first, jostled and bumped, torchlight strobing across her face; as she breaks through the front rank of the crowd she throws her free arm out wide to bar the way and screams "Wait— WAIT—" directly over her shoulder at the mob, eyes wide, breathing hard. The clip ends on that raised arm and her desperate face mid-shout. Her voice is strained and breathless from pushing through the crowd — not clean studio speech.`,
  },
  {
    n: 2, duration: 9, grade: "day", wardrobe: "arrival",
    label: "rewind/plan — ridge over the canyon",
    scene: `She walks steadily along a high rocky ridge trail, camera at arm's length on her face, wind moving her hair and shawl; far below and behind her a river canyon dotted with dozens of tiny white ${TENTS} along a winding snowmelt river, grey mist between tall dark pines. As she walks she talks to her viewers, gesturing back at the canyon with her free hand without breaking stride: "California, 1849. A hundred thousand people came for gold. Most go home with nothing. My plan: don't get rich. Just don't get robbed." Her delivery is conversational vlogger energy, slightly winded from the uphill walk.`,
  },
  {
    n: 3, duration: 11, grade: "day", wardrobe: "arrival",
    label: "camp store — the one-dollar egg",
    scene: `Inside a cramped canvas-roofed camp store: rough plank shelves nearly bare, sacks of flour, picks and shovels leaning in a corner, prices chalked on a board, a bearded storekeeper in a stained apron watching from behind a plank counter. She holds one single boiled egg up to the lens between two fingers, incredulous: "That's a dollar. For an egg. That's a week's wages back east..." — a beat, she looks at the egg, resigned — "I'm buying it." She slides a coin across the plank to the storekeeper with her free hand, peels a bit of shell, takes a bite, and while chewing her verdict comes out muffled and slowed through the mouthful, only finishing clearly after she swallows: "Nine out of ten — tastes like financial ruin." Her speech while chewing is genuinely muffled and slower; the clear punchline lands only after the swallow.`,
  },
  {
    n: 4, duration: 8, grade: "day", wardrobe: "work",
    label: "work-kit change — new silhouette",
    scene: `Standing at the muddy edge of the diggings among ${TENTS}, she is finishing putting on her work kit in one continuous motion — rolling her flannel sleeve to the forearm, tugging the grey slouch hat down firm, and stepping deliberately into the shin-deep mud with a wet squelch that sinks her boots — while talking to the lens the whole time: "Fashion in the diggings is: alive, and dry from the waist up." She looks down at her mud-swallowed boots, back up to the lens, deadpan: "I'm one for two." A real comedic beat of silence before and after the punchline — she lets it land instead of talking through it.`,
  },
  {
    n: 5, duration: 12, grade: "day", wardrobe: "work",
    label: "joins the rocker crew — earns the nod",
    scene: `At a wooden rocker-cradle sluice on the riverbank, ${AMOS} shovels gravel into the hopper while ${LI} ladles water over it; the cradle needs rocking and its handle sits idle. From the first frame she is already stepping in uninvited, camera in one hand, planting her free hand on the rocker handle and starting to rock it — clumsy at first, finding the rhythm as Amos watches her sideways. Amos, without stopping his shovel, starts to coach her: "Shake it like—" and she finishes it, matching his rhythm now: "—a cradle. Baby analogy. Got it." Li glances at her work and gives her one small approving nod, and she flashes a quick unguarded grin at the lens. Her speech bounces slightly with the physical rocking motion — rhythm of the work audibly in her voice.`,
  },
  {
    n: 6, duration: 10, grade: "day", wardrobe: "work",
    label: "first color — eleven cents, whispered irony",
    scene: `Close at the rocker's riffle bars on the riverbank: from the first frame a commotion is already building far upstream in the background — distant figures running along the bank, faint whooping about a strike carrying on the wind — while she picks a single tiny gold flake off the riffle with a wet fingertip and holds it right up to the lens, rain-grey light catching it. Looking at the flake: "Eleven cents. People are dying out here eleven cents at a time." Then she leans closer to the lens, eyes flicking toward the celebrating miners upstream, and drops to a genuine conspiratorial whisper: "The men selling the shovels are the ones getting rich. I can't tell them that." The whisper is a true whisper — hushed, close-mic, completely different energy from her normal delivery.`,
  },
  {
    n: 7, duration: 13, grade: "night", wardrobe: "work",
    label: "campfire — what the gold is for (empathy core, do not rush)",
    scene: `Night around a low campfire ring on the riverbank: she sits on a log with the camera propped at arm's length taking in her face and, beside her in frame, ${AMOS} staring into the fire, with ${LI} and two other tired miners visible across the flames. She asks the circle, gently: "What's the gold for?" A murmur passes around the ring, and Amos answers slowly, without looking up from the fire: "Eight hundred and fifty dollars. That's the price the man in Missouri set on my wife. I know it to the cent." The firelight moves on his face. She says nothing at all — her vlogger energy completely gone, her eyes going glassy as she looks at him, then slowly back to the lens, silent. The clip breathes: real pauses before and after Amos speaks, no rushing, the fire crackling the only sound in the gaps.`,
  },
  {
    n: 8, duration: 12, grade: "day", wardrobe: "work",
    label: "cholera scare — she acts on what she can't explain",
    scene: `Grey drizzle at the camp edge: from the first frame a young sandy-haired miner is already sagging against a tent pole clutching his stomach, and she is already moving to him — camera in one hand, guiding him down to sit in the shade of the canvas with the other, while two older miners hover uselessly behind muttering "it's the bad air off the river." Staying in motion the whole time, she pulls a dented kettle from the fire, pours steaming boiled water into a tin cup, presses it into his hands and makes him drink slow sips. Then she brings the camera close and whispers to her viewers, tight and frustrated: "It's in the water. Third trip in a row I've hit a germ-theory problem I'm not allowed to explain." Her whisper is genuinely hushed so the miners behind her cannot hear.`,
  },
  {
    n: 9, duration: 12, grade: "day", wardrobe: "work",
    label: "claim jump — she rings the alarm",
    scene: `On the riverbank in clear view ahead of her, two burly bearded men in brown canvas coats are already ripping ${LI}'s wooden claim stakes out of the gravel and one shoves Li hard so he stumbles into the river shallows; she sees it happen — they are directly in her sightline downstream — and reacts in one continuous motion: striding to the camp's iron alarm triangle hanging from a post, seizing the striker, and hammering it in a furious clanging rhythm while shouting at the top of her lungs across the camp: "CLAIM JUMP! MEETING — NOW!" As she keeps striking, miners are already dropping tools and converging from the tents and the diggings all around. Her shout is raw and loud over the clanging — cadence broken by the physical effort of striking the triangle.`,
  },
  {
    n: 10, duration: 14, grade: "night", wardrobe: "work",
    label: "miners' court — she pays off the cold open",
    scene: `The same torchlit night as the camp meeting: a dense crowd of at least twenty rough miners packed between ${TENTS} with burning torches — a miners' court. From the first frame she is mid-testimony, camera in one hand, pointing with her free arm at the wooden boundary stakes laid out on the ground and at ${LI} standing to one side dripping and shaken, while the two burly bearded men in brown canvas coats stand held by the arms: "He staked it, he worked it. Your code says it's his." A roar of agreement — hands go up, the vote lands for Li — but the crowd's heat keeps rising, torches pumping, voices starting to chant "ROPE 'EM! ROPE 'EM!" and the mob surges toward the two men; she shoves through to the front of the crowd, throws her free arm out wide to bar the way — the same posture as the cold open — and screams "Wait— WAIT—", then, chest heaving, into the sudden lull, hard and clear: "You're a court, not a mob. Banish them." The torch-lit faces around her hang on the word. Her voice moves from shouted-over-crowd to breathless command — never clean studio speech.`,
  },
  {
    n: 11, duration: 13, grade: "day", wardrobe: "work",
    label: "river surge — the pouch rescue (pays off clip 7)",
    scene: `Hard rain already falling from the first frame, the river already surging brown and fast over its banks around the rocker cradle: the cradle tips and washes sideways, and a small leather pouch is swept spinning into a foam-lined eddy against the rocks. She is already wading in thigh-deep, camera gripped in one hand, a long-handled shovel in the other, while ${LI} braces on the bank clamping both hands around her wrist to anchor her; fighting the current, she stretches the shovel out and hooks the pouch's drawstring on the blade, dragging it back through the water to her chest. Gasping, soaked, hair plastered to her face, she gets it out in broken bursts between breaths: "That bag — is a PERSON'S — FREEDOM. It does not — go in the river." Her speech is genuinely gasping and fragmented from the cold water and effort — real gaps, no clean sentences.`,
  },
  {
    n: 12, duration: 11, grade: "dusk", wardrobe: "work",
    label: "outro — the richest thing (reflection lands on clip 7)",
    scene: `Fading dusk on the ridge trail above the canyon: from the first frame she is pressing her own small fold of gold flakes into ${AMOS}'s open hand, closing his weathered fingers over it with both of hers — he looks at her, wordless — and she turns and walks slowly up the ridge, camera on her face, the tent fires kindling far below behind her. Walking, quiet and reflective, to her viewers: "Everyone came here to strike it rich. The richest thing I saw was a man saving eleven cents at a time for someone he loves." A breath, the ghost of a smile: "Back to 2026 — follow for the next trip." She holds the lens a beat, then the frame drifts to the darkening canyon. Her delivery is slow, low, and warm — the reflective outro register, nothing rushed.`,
  },
];

export function buildPrompt(clip) {
  const grade = clip.grade === "night" ? GRADE_NIGHT : clip.grade === "dusk" ? GRADE_DUSK : GRADE_DAY;
  const wardrobe = clip.wardrobe === "arrival" ? WARDROBE_ARRIVAL : WARDROBE_WORK;
  return [IDENTITY, wardrobe, GRIT, clip.scene, CAMERA, grade, NATURAL].join("\n\n");
}

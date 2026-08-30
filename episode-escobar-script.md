# Episode SCRIPT v2 — "I Met the Richest Criminal Who Ever Lived" (Pablo Escobar, May 1987)

**Status: DRAFT v2 — unscored, unscheduled, awaiting owner approval.** Full rewrite of
v1 (owner directive 2026-08-30) applying `prompting-and-editing-playbook.md` in full:
the cosminacreates story formula (Parts 2–3) + the official Seedance 2.5 doctrine
(Part 6) + every standing project rule. v1 is superseded — git history only.

**What changed from v1, in one paragraph:** the ordinary walking intro is gone — Pablo
speaks first, mid-confrontation, in second 0 (her every-reel opening). The episode is
now question-driven chapters that escalate (zoo → money → Robin Hood → silver-or-lead
→ the fear → farewell), each fact staged on a prop, with the hardest question at ~70%,
Pablo noticing what Hazel is at the farewell, a breathless future-cast, and the plain
hippo payoff. Every clip now carries cinematic direction (shot, ONE dominant camera
move, lighting, blocking with contact points and eyelines) and an explicit END STATE
so adjacent clips chain via the extracted-final-frame → declared-first-frame method.
A frozen Episode Style Prefix makes all clips read as one film. Dialogue will be
prompted in the official `{}` audio-clause syntax at generation time.

## OWNER DECISIONS REQUIRED BEFORE PRODUCTION (approval of this script may grant 1–2 explicitly)

1. **§38 camera coverage:** the interview scenes (clips 1, 3–8) are third-person
   cinematic two-shots — her grammar. Hazel's asides (2, and the to-lens moments)
   stay on the V-mode lens. Third-person scenes need per-scene owner approval under
   §38: approving this script approves this coverage plan.
2. **Top premise banner** "Visiting Pablo Escobar in 1987 🇨🇴" — an addition to the
   locked caption system. Yes/no.
3. **Age words:** per the official age-blind rule, Pablo's and Rosa's locks below are
   written WITHOUT age words. Hazel's frozen identity string (owner-locked) still
   contains "early twenties" — keeping it as-is until the owner decides; flagging only.
4. **Strong-expression reference view** for Hazel (official guidance: all-neutral
   sets make dialogue mouths unstable). Canon addition — owner gate.
5. **Runtime: ~129s (2:09)** — inside the 90–200s cap, inside her 104–166s range.

---

**Runtime ~129s · 11 clips · Featured figure: PABLO ESCOBAR (lock below) · Recurring
local: ROSA (one line) · Coverage: third-person interview scenes + V-mode lens asides
per clip labels · LINEAR single day, May 1987, Hacienda Nápoles + one barrio scene**

## EPISODE STYLE PREFIX (frozen — glued verbatim to every generation prompt of this episode)

```
Style: photoreal live-action documentary-cinema, vertical 9:16. No 3D render, no game
engine, no animated-film aesthetic.
Lighting: natural tropical daylight only — high hard sun early, long low golden light
from the fear chapter onward, deep golden dusk for the final three clips. Single
motivated sources; no studio fill.
Color: 60:30:10 — lush deep greens / warm earth-and-cream / one reserved accent:
raw-cash green-and-rubber-band color only in the money chapter. Muted, unpolished
period grade, fine film grain.
Camera: physical cine lens character, 180-degree shutter motion blur, one dominant
camera move per shot.
Skin: pore-level realism — visible micro-pores, vellus hair, capillary flush, matte
finish, zero beauty-retouch sheen.
Acting: micro-pauses before reactions, precise eyelines, living eyes with catchlights,
visible breathing; characters always reacting, never posing.
Physics: gravity and inertia respected; real contact shadows; no floating props.
Continuity: characters, wardrobe, props, environment locked to references across every
cut. No identity drift.
Audio: diegetic dialogue and environmental SFX only. NO BGM. No subtitles, no on-screen
text. (Music and captions are edit-stage layers.)
```

## Character locks (age-free per the official rule; paste verbatim into prompts)

**PABLO ESCOBAR** — a stocky, short ranch patron with a round, soft-featured face and
double chin; thick black curly hair, side-parted; full dark mustache; heavy-lidded,
unhurried eyes; faint permanent half-smile; real skin texture with visible pores and
sun-warmth. Open-collared pale-blue short-sleeve shirt, dark casual slacks, white
sneakers. He never raises his voice and never hurries — soft-spoken, warm, certain;
menace carried entirely by calm. Speaks English with a soft Colombian accent.

**ROSA** — a Medellín barrio mother with dark hair pulled back, a simple cotton dress
and apron, work-worn hands; warm, direct, unafraid. Colombian-accented English.

**HAZEL** — per `CHARACTER_LOCK.md` v5: the frozen identity string VERBATIM + the v5
master + 4-view reference package on every clip. Wardrobe this episode: a sage-green
short-sleeve utility shirt tucked into high-waisted cream trousers, small leather
crossbody bag (press-visitor practical, era-plausible, distinct from every NPC).
Voice-identity lock media `b24e5759-d3c0-4c84-a184-44f7cc65477e` on every clip.

**Pablo voice:** first owner-approved Pablo clip yields the 4–8s voice-identity
extraction; every later clip carries it with a VOICE IDENTITY role instruction.
**Pacing references:** ElevenLabs per character per clip, measured before use, per the
standing rule (targets in the math table).

## Dialogue wpm math (computed FIRST; durations derive from it)

Rates: Hazel urgent 200→×1.32=**264** (4.40 w/s) · neutral 160→**211** (3.52) ·
quick-hushed 140→**185** (3.08) · quiet 120→**158** (2.64) · sign-off 75→**99** (1.65)
· Pablo deliberate 140→×1.2=**168** (2.80) · Rosa neutral 160→**192** (3.20).

| Clip | Lines (speaker · rate) | Words | Speech s | Business/pauses | Dur |
|---|---|---|---|---|---|
| 1 | P 168 (7w+3w) · H 211 (13w) · P 168 (6w) | 29 | 2.5+1.1+3.7+2.1 | 1.6 | **11s** |
| 2 | H hushed 185 | 25 | 8.1 | 0.9 | **9s** |
| 3 | P 168 (3w+9w) · H 211 (3w) | 15 | 1.1+3.2+0.9 | 2.8 (walk, hippo, flinch) | **9s** |
| 4 | H 211 (6w+2w) · P 168 (6w+2w) · H 211 (22w) | 38 | 1.7+0.6+2.1+0.7+6.3 | 1.9 (beat, band-wrap) | **13s** |
| 5 | Rosa 192 (9w) · H 211 (6w) · P 168 (11w) · H quiet 158 (10w) | 36 | 2.8+1.7+3.9+3.8 | 0.8 | **13s** |
| 6 | H 211 (8w) · P 168 (3w+3w) · H hushed 185 (22w) | 36 | 2.3+1.1+1.1+7.1 | 1.1 | **13s** |
| 7 | H 211 (12w) · P 168 (16w) · H hushed 185 (14w) | 42 | 3.4+5.7+4.5 | 1.1 | **15s** |
| 8 | H 211 (7w) · P 168 (8w+10w) | 25 | 2.0+2.9+3.6 | 2.7 (incl. 2.0s silent hold) | **11s** |
| 9 | H urgent 264 | 54 | 12.3 | 0.4 | **13s** |
| 10 | H deliberate 185 | 20 | 6.5 | 0.6 | **7s** |
| 11 | H deliberate 185 (36w) + sign-off 99 (4w) | 40 | 11.7+2.4 | 0.5 | **15s** |

**Total: 11+9+9+13+13+13+15+11+13+7+15 = 129s.**

---

## THE SCRIPT

Format per clip: **[coverage] duration — scene + dialogue** → CINEMA (shot · ONE
dominant move · lighting · blocking with contact points + eyelines) → AUDIO (diegetic;
edit-stage music noted separately) → END STATE (the chaining anchor: extract this
clip's final frame → declare it as the next clip's first frame where marked ⛓).

### 1 · THE GATE — cold open [THIRD-PERSON] 11s
FIRST FRAME already mid-confrontation: a bodyguard's forearm bars Hazel's path;
beyond it, PABLO at a veranda table, already looking at her.
*[Pablo]*, calm, not rising: "You walk into my house with a camera." (0.4s) "Who sent
you?"
HAZEL, hands half-raised, steady: "Nobody. I came a very long way to hear your story —
from you."
A held beat — then the slow, warm smile: *[Pablo]*: "Then you eat with us. Sit." The
guard's arm drops.
— CINEMA: medium two-shot, camera at chest height; ONE move: slow 0.4m push-in across
the clip; FOV ~50°. Hard late-morning sun, deep veranda shade behind him. BLOCKING:
Hazel left third (x≈30%, midground), guard's arm foreground frame-left, Pablo right
third (x≈70%) seated, table contact points: his forearms on the table, her sandals
planted on the tile. EYELINES: his eyes locked on her from frame 1 and never leaving;
hers on him; the guard watches HIM (waiting for the order), not her.
— AUDIO: cicadas, distant ranch machinery, a horse somewhere; cutlery stillness;
{dialogue}; NO BGM. Edit-stage: tense low drone starts here.
— END STATE ⛓: guard's arm down at his side, Pablo's open hand gesturing to the empty
chair, Hazel one step toward it, eyes still on him.
— (Proposed banner overlay, edit stage: "Visiting Pablo Escobar in 1987 🇨🇴".)

### 2 · THE ASIDE [V-MODE, her lens] 9s
Walking a step behind him along the veranda toward the grounds, camera to her face,
hushed and quick:
HAZEL: "Forbes just named him one of the richest men on Earth. In six years, he'll be
dead on a rooftop. He doesn't know. I do."
— CINEMA: her handheld selfie framing, chest-up; ONE move: natural walk sway, forward
motion per §14 (she walks forward normally; NOT backward-tracking). Sunlit colonnade
passing behind her. EYELINES: eyes to lens; one flick toward Pablo ahead on "he
doesn't know," back to lens.
— AUDIO: her footsteps on tile, his ahead, birds; {her hushed line}; NO BGM.
— END STATE: she lowers the camera slightly, lifting her chin toward something
off-frame right — the eyeline that launches clip 3.

### 3 · CHAPTER: THE ZOO [THIRD-PERSON] 9s
The lake shore. *[Pablo]*, walking her along the water: "Come. My animals."
A HIPPO surfaces loudly beside them — she flinches a full step; he doesn't move at all.
*[Pablo]*, amused, gesturing across the water: "Four hippos. From Africa. What I want,
I bring."
HAZEL, straight to lens, deadpan: "Remember the hippos."
— CINEMA: wide two-shot at the water's edge; ONE move: lateral tracking with their
walk, settling when the hippo surfaces; FOV ~63°. Bright water glare, green banks.
BLOCKING: Pablo nearest the water (he owns this place), Hazel between camera and him;
hippo mid-lake, CONTINUOUS visible motion — surfacing, ear-flick, wake (§17).
EYELINES: her eyes on the path → snap to the hippo on the splash → to Pablo on his
line → to LENS for her tag line (the aside beat inside the scene, her signature move).
— AUDIO: water, the hippo's blow and grunt <loud surface splash>, birds; {dialogue};
NO BGM. Edit-stage: first playful music sting enters at the flinch.
— END STATE ⛓: the two walking on along the shore away from camera, hippo's wake
settling, a low ranch building ahead — the money room's exterior.

### 4 · CHAPTER: THE MONEY [THIRD-PERSON with lens tag] 13s
The money room: raw cash in bricks to the ceiling. He tosses her a rubber band; she
catches it and wraps a loose brick herself (§12).
HAZEL: "How much do you actually make?"
*[Pablo]*, patting a stack once: "Four hundred and twenty million dollars."
HAZEL: "A year?"
(0.4s beat) *[Pablo]*: "A week."
HAZEL, to lens, still wrapping: "There's so much cash in storage, rats eat ten percent
of it. He spends twenty-five hundred dollars a month on rubber bands."
— CINEMA: interior medium; ONE move: slow push-in toward her hands and the brick; the
"A week." beat is the edit-stage CRASH ZOOM + bass-drop moment (digital punch-in,
within-clip, hard-cut safe). Slatted warehouse light through boards, dust motes.
BLOCKING: cash walls on both sides (scale: stacks past both frame edges), Pablo right
third resting a hand on a stack, Hazel center with the brick — contact points: her
fingers on the band, his palm on the money. EYELINES: her eyes track the tossed band
into her hands, up to HIM for both questions; his eyes on her through "a week," one
slow glance along the cash wall; her eyes to lens for the rat line, one glance down
at the band snap.
— AUDIO: paper shift, the rubber band SNAP <sharp band snap>, muffled exterior;
{dialogue}; NO BGM. Edit-stage: music cuts OUT dead on "A week." — silence sells it —
then resumes.
— CONTENT LOCK: cash only. No drugs, ever, in any frame.
— END STATE ⛓: brick wrapped, set on the stack; he's already turning toward the door,
light flaring in from outside.

### 5 · CHAPTER: ROBIN HOOD [THIRD-PERSON] 13s
Golden afternoon, the barrio street he built — kids on a concrete pitch, neighbors, a
radio somewhere. ROSA takes Hazel's hand in both of hers:
*[Rosa]*: "Don Pablo built our whole street. God bless him."
HAZEL, to Pablo, level: "Why do you give it away?"
*[Pablo]*, watching the kids, quieter than before: "I was poor. I promised myself my
people would not be."
HAZEL, a few steps apart, quiet, to lens — jokes gone: "The help is real. But he kills
journalists. Judges. Policemen."
— CINEMA: street-level medium coverage; ONE move: slow lateral drift with the street's
life; long golden light, ball shadows crossing frame. BLOCKING: populated street per
§17 — kids in continuous motion, neighbors passing both frame edges; Rosa foreground
with Hazel, Pablo midground among the kids (his one unguarded moment). EYELINES:
Rosa's eyes on Hazel; Hazel's on Rosa, then on PABLO for her question; his eyes stay
ON THE KIDS through his answer (deliberate — he doesn't perform this line); her eyes
to lens for the quiet piece, steady, no glances.
— AUDIO: kids shouting, the ball, the radio faint, street life; {dialogue}; NO BGM.
Edit-stage: warm theme rises through Rosa, cuts to near-silence under Hazel's quiet
lens piece.
— END STATE ⛓: Pablo rolling the ball back to the kids; Hazel watching him do it,
lens lowered.

### 6 · CHAPTER: SILVER OR LEAD [THIRD-PERSON] 13s
Back at the veranda table, tighter now.
HAZEL: "And the people who say no to you?"
*[Pablo]*, perfectly calm, almost gentle: "Everyone accepts something." (0.5s)
"Silver… or lead."
A man appears at the veranda edge; Pablo rises, touches her shoulder in apology, steps
away. She waits until he is clearly distant — then hushed, to lens:
HAZEL: "Silver is money. Lead is a bullet. The last minister who came after him was
murdered. Everyone knows. Nobody can prove it."
— CINEMA: medium close two-shot; ONE move: none — the camera holds locked while he
delivers the line (stillness = menace), her lens aside handheld after he leaves.
Golden light going amber. BLOCKING: his forearms on the table, her hands around a
coffee she never drinks. EYELINES: his eyes hold hers, unblinking, through "silver…
or lead"; her eyes follow him as he walks away and only when he is far do they come
to the lens; ONE flick back toward him mid-aside, back to lens.
— AUDIO: cicadas thickening, a chair scrape, his receding footsteps; {dialogue};
NO BGM. Edit-stage: the drone from clip 1 returns under the aside.
— END STATE ⛓: Hazel alone at the table, his empty chair, doorway dark behind.

### 7 · CHAPTER: THE FEAR — the hardest question [THIRD-PERSON] 15s
Interior, ceiling fan turning, the day's first true shade.
HAZEL, direct: "February. Your partner Lehder — taken to an American prison. Are you
afraid?"
The warmth stops. *[Pablo]*, level, slow: "I would rather have a grave in Colombia…"
(0.5s) "…than a jail cell in the United States."
He looks toward the window. She turns to lens, hushed:
HAZEL: "Next month the Supreme Court kills the extradition treaty. He wins. For six
years."
— CINEMA: the episode's tightest framing — close-up shot-reverse-shot proximity
(her question in a clean single, his answer in a slow push-in close-up: proximity
escalation, her grammar); fan-blade shadow ticking across his face. EMOTION (2–4
observable cues, official form): after her question, his half-smile stops; his jaw
sets; his thumb presses the armrest; the eyes do not blink through the line.
EYELINES: her eyes on him for the question; his hold hers through both halves; on his
window-turn her eyes come to the lens; one glance at his profile on "he wins," back.
— AUDIO: the fan's tick, distant thunder far off, {dialogue}; NO BGM. Edit-stage:
lowest, sparsest music of the episode — almost nothing.
— END STATE ⛓: his profile at the window, her seated watching him, fan still turning.

### 8 · THE FAREWELL — he notices her [THIRD-PERSON] 11s
Dusk. He walks her toward the gate, host to the end.
HAZEL: "Last question. How does this end, Pablo?"
*[Pablo]*, small smile, completely certain: "It doesn't. Colombia and I have an
arrangement." (0.4s — then, studying her face:) "You ask questions like someone who
already knows the answers."
She holds his look — then her eyes settle on the lens. TWO FULL SECONDS, silent.
— CINEMA: walking two-shot settling to a face-to-face medium; ONE move: the camera
stops when they stop; the gate plane silhouetted above and behind them. EYELINES:
mutual eye contact through question and answer; on his "you ask questions…" line his
eyes narrow slightly, reading her; her eyes to lens for the silent hold — no other
movement anywhere in frame (owner-locked restraint beat; the silence carries it).
— AUDIO: crickets beginning, a horse led past somewhere, {dialogue}; NO BGM.
Edit-stage: all music out for the silence.
— END STATE ⛓: the two facing each other under the gate, his back beginning its turn
toward the house.

### 9 · THE FUTURE-CAST [V-MODE, her lens] 13s
She walks the drive out alone (forward walk, §14), dusk deepening, pace RISING:
HAZEL: "Here's what he doesn't know. In two years, Forbes ranks him seventh-richest
on Earth — and his men bomb a passenger plane. A hundred and ten people. Then a
prison he builds himself. Jacuzzi. Football field. His own guards. Then he escapes.
Hiding, he burns two million dollars to keep his daughter warm."
— CINEMA: handheld selfie, walking energy, the ranch receding behind her; golden dusk
flaring the lens once. EYELINES: eyes to lens, natural forward glances per §14.
— AUDIO: her steps on gravel quickening, crickets, {her line}; NO BGM. Edit-stage:
music DRIVES here — the fastest cutting of the edit (b-roll punch-ins of earlier
end-frames are an edit-stage option, hard cuts only).
— END STATE ⛓: she stops — the gate plane directly above her, silhouetted.

### 10 · THE DATE [V-MODE, her lens] 7s
Still, under the plane. Slow and level:
HAZEL: "December second, nineteen ninety-three. A rooftop in Medellín. One day after
his forty-fourth birthday. His war killed thousands of people."
— CINEMA: static handheld close-up, the plane's dark shape over her; last amber light.
EYELINES: eyes to lens, unmoving. The deliberate-slow CONTRAST beat after 9's speed.
— AUDIO: crickets alone; {her line}; NO BGM. Edit-stage: one low sustained note.
— END STATE ⛓: same frame, her eyes steady — clip 11 continues the composition wider.

### 11 · OUTRO — THE HIPPOS [V-MODE, her lens] 15s
Same spot, framing opens slightly; the ranch dark behind, first stars.
HAZEL, plain, quiet: "Today, everything he built is gone. The money. The cartel. This
ranch. Except the hippos. Nobody could move them — they escaped, and kept breeding.
Over a hundred live wild in Colombia today. All from his four."
(0.5s) Soft: "Hazel — out of time."
— CINEMA: ONE move: a slow drift back/wider through the whole clip (the exhale);
dusk-to-night grade. EYELINES: eyes to lens throughout; one small glance back at the
dark ranch on "this ranch," back to lens for everything after.
— AUDIO: night insects, a far-off hippo grunt from the lake <distant low grunt> (the
sound-design payoff), {her lines}; NO BGM. Edit-stage: warm resolving strings, then
silence under the sign-off.
— END STATE: final frame — her face, the gate plane, the dark ranch. Hold to black.

---

## Split-by-job & chaining plan (per playbook Part 6)

- Every clip above is ONE job (a confrontation, an aside, a stat exchange, a quiet
  answer) — no clip mixes physics with performance. The hippo surfacing (3) is the
  only physics event and it shares its clip with nothing performance-critical.
- ⛓ marks: every marked end state's final frame is extracted from the APPROVED clip
  and declared as the next clip's first frame in prose ("@Image N is the first
  frame…"), locking wardrobe, light, and geography across the hard cut.
- Third-person interview scenes and V-mode asides alternate — the cut between them is
  her signature rhythm and needs no blend: hard cut, audio continuous (§16).

## Edit-stage design (executed with our existing pipeline; every transition a hard cut)

Crash-zoom punch-in + music dropout on "A week." (4) · whip-out blur generated at the
end of clip 3 into the money room's hard cut · music chapters: tense drone (1–2) →
playful (3–4) → warm-then-silent (5) → drone returns (6) → near-nothing (7–8) →
driving (9) → one note (10) → resolve (11) · captions per the locked word-chunk
system (gold keyword highlight = pending owner decision) · banner overlay clips 1–2
only (pending owner decision).

## Carried over unchanged from v1

Fact-verification list (concept v4 — must close before generation prompts) · content
locks (no drugs on screen ever; all violence spoken, never shown) · ElevenLabs pacing
+ measurement rule · Hazel voice lock on every clip · Pablo voice lock from first
approved clip · no 4K before approval · every clip delivered to the owner the moment
it renders · no regeneration without explicit go-ahead.

## RETENTION AUDIT

| Beat | Question held | Spike |
|---|---|---|
| 1 · 0:00–0:11 | Is she in trouble? Who IS this? | Confrontation hook |
| 2 · 0:11–0:20 | How does he die? | The audience-knows contract |
| 3 · 0:20–0:29 | A private zoo?? | Hippo flinch + plant |
| 4 · 0:29–0:42 | How rich, actually? | "A week." — the shock stat |
| 5 · 0:42–0:55 | Is he… good? | Both ledgers stated plainly |
| 6 · 0:55–1:08 | What happens to "no"? | Silver or lead + murdered minister |
| 7 · 1:08–1:23 | What is he afraid of? | The grave line — tension peak |
| 8 · 1:23–1:34 | Does he suspect her? | "…someone who already knows the answers" |
| 9–10 · 1:34–1:54 | How does it end? | The whole fall, fast → the date, slow |
| 11 · 1:54–2:09 | What's left? | The hippos — comment-bait payoff |

## Pre-finalization checklist (MASTER RULE — run and passed)

wpm computed first, durations derived (table) · eyelines every dialogue beat ·
plain-language literal-reading test on every line · active participant (challenges,
wraps cash, walks the barrio) · §7 embedded drama (hippo) · §8 physical gating ·
§9 per-beat durations · §13 realism (style prefix) · §14 forward walking (2, 9) ·
§17 populated world (ranch staff, kids, hippo motion) · §16 hard cuts + audio
continuity · OPENING LAW linear · camera: one dominant move per clip, third-person
coverage flagged for §38 approval · emotion as observable cues (7) · model: Seedance
2.5 omni_reference, 720p working res, no material limitation found · sound designed
per chapter · facts flagged for the research pass.

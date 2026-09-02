# Spartacus / Capua arena — clip manifest

Shot-for-shot recreation of the Troy (2004) Achilles-vs-Hector duel, 0:00–0:22.
See `troy-duel-fight-scene-study.md` (the reverse-engineering) and
`episode-spartacus-arena-plan.md` (the 1:1 copy map).

Generated media is **not** committed (standing rule). Everything below is
retrievable from Higgsfield by job ID. This file is what lets another session
QC the set without re-deriving the IDs from a chat transcript.

Result URL pattern:
`https://d8j0ntlcm91z4.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/hf_<timestamp>_<id>.mp4`

## Clips (Seedance 2.5, 9:16, 1080p, 5s source; harvest window per the cut recipe)

| Shot | Job ID | Face | Notes |
|---|---|---|---|
| S1  | b123e0f1-ecd5-41d5-bede-ae42be10a664 | old | re-do onto Face B pending |
| S2  | 5ae63fa7-fba7-4fd0-bc2c-f615bbf4465f | B | |
| S3  | c87ea632-e873-49e4-9e56-a111805e6432 | — | |
| S4  | d1877770-c6d6-42e1-a279-9707349a1ef3 | old | re-do onto Face B pending |
| S5  | 7cefc6f9-f45d-401f-8bdf-e62a47abf667 | old | re-do onto Face B pending |
| S6  | 00efba56-2722-4319-935f-18a077a98b8a | B | |
| S7  | 0c3e72be-53e7-439d-b7f8-c4a4fa20c20b | — | |
| S8  | a3e217d3-e8a4-44b2-bd08-72230bee3416 | — | |
| S9  | 68221aac-e47d-467e-905d-212ae9376f53 | — | |
| S10 | 646c42ec-00a3-4179-8876-f6a4977a6ebf | B | cleared after 4 refusals — see FRAME-CAUSE below |
| S11 | a377445b-4eba-4924-946c-270d9204b1b5 | old | re-do onto Face B pending |
| S12 | 462051d2-02dc-46f2-a675-eadcdddd534d | — | |
| S13 | 751b1b02-3474-42c0-a260-50b0d59f4bbb | B | |
| S14 | 9c2af413-99d8-4878-bdeb-0053f1e42dca | old | re-do onto Face B pending |
| S15 | c70054cb-2171-4ab2-b145-26c193359678 | — | |
| S16 | 8144d68d-3f96-45f2-bc55-d562807b14eb | — | |
| S17 | a7efb9e3-fd4c-4a1b-ac4c-b8c3bccec96f | — | |
| S18 | eb520523-707a-44f1-9a86-566c011751d3 | — | |
| S19 | c53fe65e-5945-4808-b3d2-876f544afc57 | B | |
| S20 | 6e55ef7c-e3b7-4929-b133-385322de04ef | old | re-do onto Face B pending |
| S21 | 0e646536-439e-42a9-afee-64ff820ed7a9 | B | cleared after 4 refusals — see FRAME-CAUSE below |

"Face" = which Spartacus face the clip carries. "old" = the pre-recast face;
"B" = the owner-approved features-only recast (`84ffd471-c4e4-4d5b-bb22-24b85fb5f5e0`).
"—" = Spartacus not identifiable in frame (Hazel-only or insert shots).

## Key media IDs

| What | Media ID |
|---|---|
| Face B locked reference | 84ffd471-c4e4-4d5b-bb22-24b85fb5f5e0 |
| S10 start frame (harvested from S9 tail) | f9ec735e-8820-40b5-b1b7-7161975cdbb5 |
| S21 start frame (harvested from S20 tail) | cac1961a-fb57-435e-8a23-6b9a03075a7c |

## Assembly recipe (run in `sandbox_exec`, chained in one command)

```
cut(){ ffmpeg -y -v error -ss $2 -t $3 -i $1.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1" \
  -c:v libx264 -preset veryfast -crf 18 -r 24 -pix_fmt yuv420p \
  -c:a aac -ar 48000 -ac 2 -b:a 128k c_$1.mp4; }
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy arena_cut.mp4
```

In-point / duration per shot (seconds), matching the reference's own cut timings:

```
s01 1.8 0.8 | s02 -- 1.0 | s03 1.0 1.0 | s04 1.5 1.8 | s05 0.9 1.0
s06 1.6 1.0 | s07 0.5 1.1 | s08 1.5 0.8 | s09 0.6 1.1 | s10 -- 1.2
s11 2.0 1.0 | s12 2.0 1.0 | s13 -- 0.8 | s14 2.0 0.9 | s15 1.2 1.0
s16 0.8 0.9 | s17 0.3 0.9 | s18 0.4 1.3 | s19 1.6 1.2 | s20 1.4 1.1
s21 -- 1.1
```

## Deliveries

| Version | Length | Shots | URL |
|---|---|---|---|
| 17-shot rough | 18.4s | 17 | https://d2ol7oe51mr4n9.cloudfront.net/user_3HHW3t9HKeBMFC3M9ni2feFvlmB/e7cf4c08-2185-48d3-a6c3-fb02f5d8e70c.mp4 |

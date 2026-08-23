#!/usr/bin/env python3
"""One-off: clip7's shouted lines defeat whisper (small.en: bad merge across a
real pause; medium.en: worse, hallucinated a repeat and still missed the
shouted lines). Falls back to proportional-by-character-length interpolation
WITHIN each already-verified (silencedetect-grounded) line window, processed
independently per line -- the same "biggest real pauses are the line breaks,
split what's left proportionally" methodology this project has used all
along for windows with no finer-grained real measurement, just applied here
at chunk instead of line granularity. Line windows are this session's own
silencedetect-verified clip7 timing (0-2.5, 2.5-6.359, 7.303-13.072834), not
re-derived here.
"""
import json

PAUSE_BREAK = 0.35
FLICKER_FIX = 0.15
DUR = 13.072834

LINES = [
    (0.0, 2.5, "Read it yourself — ALONE!"),
    (2.5, 6.359, "THE RED ONE! RED MEANS FIRST—"),
    (7.303, 13.072834, "The sheriff in 1875 at least tipped his hat."),
]


def chunk_line(lo, hi, text):
    toks = text.split()
    w_len = sum(len(t) for t in toks) or 1
    words, t0 = [], lo
    for t in toks:
        frac = len(t) / w_len
        words.append((t0, t0 + (hi - lo) * frac, t))
        t0 += (hi - lo) * frac
    chunks, cur = [], []
    for s, e, w in words:
        if cur and (s - cur[-1][1] >= PAUSE_BREAK):
            chunks.append(cur); cur = []
        cur.append((s, e, w))
        if len(cur) == 2 or (w.rstrip('"')[-1] in ".!?…"):
            chunks.append(cur); cur = []
    if cur:
        chunks.append(cur)
    return [[c[0][0], c[-1][1], " ".join(x[2] for x in c).upper()] for c in chunks]


events = []
for lo, hi, text in LINES:
    events.extend(chunk_line(lo, hi, text))

for a, b in zip(events, events[1:]):
    if 0 < b[0] - a[1] < FLICKER_FIX:
        a[1] = b[0]
for ev in events:
    ev[0] = max(0.0, round(ev[0], 3))
    ev[1] = min(DUR, round(ev[1], 3))

for s, e, t in events:
    print(f"   {s:7.3f} - {e:7.3f}  {t}")
json.dump({"clip7": events}, open("clip7_correction.json", "w"), indent=1)
print("DONE -> clip7_correction.json")

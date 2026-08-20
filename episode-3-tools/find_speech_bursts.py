#!/usr/bin/env python3
# Structured speech-burst finder built on rms_envelope.py's fine-grained
# (40ms window) band-passed energy data. Prints contiguous above-threshold
# runs as (start, end, duration, peak_db) instead of a raw bar chart, so
# every clip's real speech timing can be read off directly rather than
# eyeballed. Threshold is set relative to the CLIP's OWN peak (not a fixed
# number), same rationale as qc_pass.mjs's adaptive silencedetect, but at
# much finer time resolution (40ms vs silencedetect's coarser sensitivity)
# so consecutive words in fast delivery don't collapse into one run.
import sys
sys.path.insert(0, "/home/user/chloe/episode-3-tools")
from rms_envelope import rms_envelope

path = sys.argv[1]
margin_db = float(sys.argv[2]) if len(sys.argv) > 2 else 16.0
min_run = float(sys.argv[3]) if len(sys.argv) > 3 else 0.10
merge_gap = float(sys.argv[4]) if len(sys.argv) > 4 else 0.18

env = rms_envelope(path)
peak = max(db for _, db in env)
threshold = peak - margin_db
print(f"# peak={peak:.1f}dB threshold={threshold:.1f}dB (margin={margin_db}dB)")

runs = []
cur_start = None
for t, db in env:
    above = db >= threshold
    if above and cur_start is None:
        cur_start = t
    elif not above and cur_start is not None:
        runs.append((cur_start, t))
        cur_start = None
if cur_start is not None:
    runs.append((cur_start, env[-1][0] + 0.04))

# merge close runs
merged = []
for s, e in runs:
    if merged and s - merged[-1][1] < merge_gap:
        merged[-1] = (merged[-1][0], e)
    else:
        merged.append((s, e))

merged = [(s, e) for s, e in merged if e - s >= min_run]
for s, e in merged:
    peakdb = max(db for t, db in env if s <= t <= e)
    print(f"{s:6.2f} -> {e:6.2f}  ({e-s:5.2f}s)  peak {peakdb:.1f}dB")

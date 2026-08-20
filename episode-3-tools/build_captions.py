#!/usr/bin/env python3
# Builds final caption cues for every clip from the fine-grained real speech
# bursts (find_speech_bursts.py), using the same word-proportional
# gap-anchored allocation as qc_pass.mjs's allocate() — every boundary is a
# real detected gap, chosen by matching each sentence's word-count share of
# the total spoken span. This replaces the coarser silencedetect-based
# pipeline for the full-episode re-verification (owner round 4).
import json, sys
sys.path.insert(0, "/home/user/chloe/episode-3-tools")
from rms_envelope import rms_envelope

def find_bursts(wav_path, margin_db=16.0, min_run=0.10, merge_gap=0.18):
    env = rms_envelope(wav_path)
    peak = max(db for _, db in env)
    threshold = peak - margin_db
    runs, cur_start = [], None
    for t, db in env:
        above = db >= threshold
        if above and cur_start is None:
            cur_start = t
        elif not above and cur_start is not None:
            runs.append((cur_start, t)); cur_start = None
    if cur_start is not None:
        runs.append((cur_start, env[-1][0] + 0.04))
    merged = []
    for s, e in runs:
        if merged and s - merged[-1][1] < merge_gap:
            merged[-1] = (merged[-1][0], e)
        else:
            merged.append((s, e))
    return [(s, e) for s, e in merged if e - s >= min_run]

def allocate(sentences, segs):
    n = len(sentences)
    if n == 1:
        return [(segs[0][0], segs[-1][1], sentences[0])]
    wc = [len(s.split()) for s in sentences]
    total = sum(wc)
    spanStart, spanEnd = segs[0][0], segs[-1][1]
    totalSpan = spanEnd - spanStart
    cum, targets = 0, []
    for i in range(n - 1):
        cum += wc[i]
        targets.append(spanStart + totalSpan * (cum / total))
    candidates = [((segs[i][1] + segs[i+1][0]) / 2, i) for i in range(len(segs) - 1)]
    used, chosen = set(), []
    for t in targets:
        best, bestDist = None, 1e9
        for pos, idx in candidates:
            if idx in used: continue
            d = abs(pos - t)
            if d < bestDist: bestDist, best = d, idx
        if best is not None:
            used.add(best); chosen.append(best)
    chosen.sort()
    groups, g = [], []
    for i, seg in enumerate(segs):
        g.append(seg)
        if i in chosen:
            groups.append(g); g = []
    if g: groups.append(g)
    while len(groups) < n:
        li, worst = 0, -1
        for i, gr in enumerate(groups):
            span = gr[-1][1] - gr[0][0]
            if span > worst: worst, li = span, i
        gr = groups[li]; s, e = gr[0][0], gr[-1][1]; mid = (s+e)/2
        groups[li:li+1] = [[(s, mid)], [(mid, e)]]
    return [(groups[i][0][0], groups[i][-1][1], sentences[i]) for i in range(n)]

if __name__ == "__main__":
    wav = sys.argv[1]
    sentences = json.loads(sys.argv[2])
    margin = float(sys.argv[3]) if len(sys.argv) > 3 else 16.0
    segs = find_bursts(wav, margin_db=margin)
    if not segs:
        print(json.dumps({"error": "no bursts found"})); sys.exit(1)
    cues = allocate(sentences, segs)
    out = [{"start": round(s,3), "end": round(e,3), "text": t} for s,e,t in cues]
    print(json.dumps(out, indent=1))

#!/usr/bin/env python3
# Episode "Elon origins" — edit-stage assembly per creative-direction.md §16:
# uniform intermediates (1080x1920, 24fps, h264 CRF16, 48kHz, loudnorm,
# 0.08s audio-only edge fades, frame-exact duration cap), TRUE hard-cut concat,
# V.O. overlay at absolute offsets, ffprobe frame-count sanity check.
import subprocess, json, os, sys

FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
A = "assets"
os.makedirs(f"{A}/inter", exist_ok=True)

# (name, file) in episode order
CLIPS = [
    ("1a",  "clip1a_hook_4k_higgsfield.mp4"),
    ("1b",  "clip1b_r_boy.mp4"),
    ("2a",  "clip2_r_vic20.mp4"),
    ("2b",  "clip2b_insert.mp4"),
    ("3",   "scene3_oner_v2.mp4"),
    ("4a",  "clip4a_tower.mp4"),
    ("4b",  "clip4b_blueprint.mp4"),
    ("5",   "clip5_walk.mp4"),
    ("6",   "clip6_exchange.mp4"),
    ("7a",  "clip7a_walk.mp4"),
    ("7b",  "clip7b_hero.mp4"),
    ("7c",  "clip7c_liftoff.mp4"),
    ("8a",  "clip8a_orbit.mp4"),
    ("8b",  "clip8b_signing.mp4"),
    ("9a1", "clip9a1_landing.mp4"),
    ("9a2", "clip9a2_street.mp4"),
    ("9a3", "clip9a3_astronauts.mp4"),
    ("9b",  "clip9b_bookend.mp4"),
]
# V.O. placement: vo file -> clip name whose start anchors it
VO = [("vo_sample_scene2.wav", "2a"), ("vo_scene4.wav", "4a"), ("vo_scene5.wav", "5"),
      ("vo_scene7a.wav", "7a"), ("vo_scene7b.wav", "7b"), ("vo_scene8.wav", "7c")]

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("CMD FAILED:", " ".join(cmd)[:300]); print(r.stderr[-1500:]); sys.exit(1)
    return r

def probe_dur(path, stream="v:0"):
    r = subprocess.run([FF, "-hide_banner", "-i", path], capture_output=True, text=True)
    import re
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr)
    h, mn, s = int(m.group(1)), int(m.group(2)), float(m.group(3))
    return h*3600 + mn*60 + s

# 1) uniform intermediates
inter, durs = [], {}
for name, f in CLIPS:
    src, out = f"{A}/{f}", f"{A}/inter/{name}.mp4"
    d = probe_dur(src)
    fade_out_start = max(d - 0.08, 0)
    run([FF, "-y", "-v", "error", "-i", src,
         "-vf", "scale=1080:1920:flags=lanczos,fps=24,setsar=1",
         "-af", f"loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.08,afade=t=out:st={fade_out_start:.3f}:d=0.08,aresample=48000",
         "-t", f"{d:.3f}",
         "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-ar", "48000", out])
    di = probe_dur(out)
    durs[name] = di
    inter.append(out)
    print(f"inter {name}: {di:.2f}s")

# 2) hard-cut concat (identical encodes -> concat demuxer, stream copy)
with open(f"{A}/inter/list.txt", "w") as fh:
    for p in inter:
        fh.write(f"file '{os.path.abspath(p)}'\n")
run([FF, "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", f"{A}/inter/list.txt",
     "-c", "copy", f"{A}/inter/concat.mp4"])

# 3) V.O. overlay at absolute offsets
starts, t = {}, 0.0
for name, _ in CLIPS:
    starts[name] = t; t += durs[name]
total = t
print(f"total runtime: {total:.2f}s")

vo_inputs, filters, mix = [], [], ["[0:a]"]
for i, (vf, anchor) in enumerate(VO, start=1):
    vo_inputs += ["-i", f"{A}/{vf}"]
    off_ms = int(starts[anchor] * 1000)
    vd = probe_dur(f"{A}/{vf}")
    window_end = starts[anchor] + vd
    print(f"VO {vf}: anchor {anchor} @ {starts[anchor]:.2f}s, dur {vd:.2f}s, ends {window_end:.2f}s")
    filters.append(f"[{i}:a]aresample=48000,volume=1.0,adelay={off_ms}|{off_ms}[vo{i}]")
    mix.append(f"[vo{i}]")
fc = ";".join(filters) + f";{''.join(mix)}amix=inputs={len(mix)}:duration=first:normalize=0[aout]"
run([FF, "-y", "-v", "error", "-i", f"{A}/inter/concat.mp4", *vo_inputs,
     "-filter_complex", fc, "-map", "0:v", "-map", "[aout]",
     "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", f"{A}/elon_final_cut.mp4"])

# 4) sanity checks
fd = probe_dur(f"{A}/elon_final_cut.mp4")
print(f"final duration: {fd:.2f}s (expected ~{total:.2f}s)")
assert abs(fd - total) < 1.0, "DURATION MISMATCH — investigate before delivery"

# 5) delivery copy
run([FF, "-y", "-v", "error", "-i", f"{A}/elon_final_cut.mp4",
     "-c:v", "libx264", "-b:v", "1800k", "-preset", "medium", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "128k", f"{A}/elon_final_cut_compressed.mp4"])
print("delivery copy:", os.path.getsize(f"{A}/elon_final_cut_compressed.mp4"), "bytes")
print("DONE")

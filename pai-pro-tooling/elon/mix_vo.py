#!/usr/bin/env python3
# V.O. mix pass v2: trim silence from each VO, re-plan offsets with collision
# rules (no VO over VO, no VO over on-camera dialogue), remix over concat.mp4.
import subprocess, os, re, sys

FF = "/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
A = "assets"

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("FAILED:", " ".join(cmd)[:300]); print(r.stderr[-1200:]); sys.exit(1)
    return r

def dur(path):
    r = subprocess.run([FF, "-hide_banner", "-i", path], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr)
    return int(m.group(1))*3600 + int(m.group(2))*60 + float(m.group(3))

# trim leading+trailing silence from each VO
VOS = ["vo_sample_scene2", "vo_scene4", "vo_scene5", "vo_scene7a", "vo_scene7b", "vo_scene8"]
# pitch-preserving tempo per line so each block fits its window with margin
TEMPO = {"vo_sample_scene2": 1.05, "vo_scene4": 1.13, "vo_scene5": 1.13,
         "vo_scene7a": 1.16, "vo_scene7b": 1.16, "vo_scene8": 1.0}
tdur = {}
for v in VOS:
    out = f"{A}/{v}_trim.wav"
    run([FF, "-y", "-v", "error", "-i", f"{A}/{v}.wav",
         "-af", f"silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse,atempo={TEMPO[v]}",
         out])
    tdur[v] = dur(out)
    print(f"{v}: raw {dur(f'{A}/{v}.wav'):.2f}s -> trimmed+tempo({TEMPO[v]}) {tdur[v]:.2f}s")

# clip start times from the intermediates (already built)
order = ["1a","1b","2a","2b","3","4a","4b","5","6","7a","7b","7c","8a","8b","9a1","9a2","9a3","9b"]
starts, t = {}, 0.0
for n in order:
    starts[n] = t; t += dur(f"{A}/inter/{n}.mp4")
total = t

# plan offsets with collision rules
plan = {}
plan["vo_sample_scene2"] = starts["2a"] + 0.15
end2 = plan["vo_sample_scene2"] + tdur["vo_sample_scene2"]
assert end2 <= starts["3"] - 0.1, f"VO2 overruns into oner: ends {end2:.2f}, oner at {starts['3']:.2f}"
plan["vo_scene4"] = starts["4a"] + 0.2
end4 = plan["vo_scene4"] + tdur["vo_scene4"]
# may spill into clip5's silent walk, but VO5 must wait for it
plan["vo_scene5"] = max(starts["5"] + 0.2, end4 + 0.5)
end5 = plan["vo_scene5"] + tdur["vo_scene5"]
assert end5 <= starts["6"] + 2.0, f"VO5 overruns into exchange: ends {end5:.2f}, clip6 at {starts['6']:.2f}"
plan["vo_scene7a"] = starts["7a"] + 0.2
end7a = plan["vo_scene7a"] + tdur["vo_scene7a"]
plan["vo_scene7b"] = end7a + 0.3  # may start over 7a tail — narration flows across the cut
end7b = plan["vo_scene7b"] + tdur["vo_scene7b"]
assert end7b <= starts["7c"] - 0.05, f"VO7b overruns into liftoff: ends {end7b:.2f}, 7c at {starts['7c']:.2f}"
plan["vo_scene8"] = starts["7c"] + 0.2
end8 = plan["vo_scene8"] + tdur["vo_scene8"]
assert end8 <= starts["9a1"] - 0.1, f"VO8 overruns into montage: ends {end8:.2f}"
for v in VOS:
    print(f"PLAN {v}: {plan[v]:.2f}s -> {plan[v]+tdur[v]:.2f}s")

# remix
vo_inputs, filters, mix = [], [], ["[0:a]"]
for i, v in enumerate(VOS, start=1):
    vo_inputs += ["-i", f"{A}/{v}_trim.wav"]
    off = int(plan[v]*1000)
    filters.append(f"[{i}:a]aresample=48000,adelay={off}|{off}[vo{i}]")
    mix.append(f"[vo{i}]")
fc = ";".join(filters) + f";{''.join(mix)}amix=inputs={len(mix)}:duration=first:normalize=0[aout]"
run([FF, "-y", "-v", "error", "-i", f"{A}/inter/concat.mp4", *vo_inputs,
     "-filter_complex", fc, "-map", "0:v", "-map", "[aout]",
     "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", f"{A}/elon_final_cut.mp4"])
fd = dur(f"{A}/elon_final_cut.mp4")
print(f"final: {fd:.2f}s (expected {total:.2f}s)")
assert abs(fd-total) < 1.0
run([FF, "-y", "-v", "error", "-i", f"{A}/elon_final_cut.mp4",
     "-c:v", "libx264", "-b:v", "1400k", "-preset", "medium", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "128k", f"{A}/elon_final_cut_compressed.mp4"])
print("delivery:", os.path.getsize(f"{A}/elon_final_cut_compressed.mp4"), "bytes")
print("DONE")

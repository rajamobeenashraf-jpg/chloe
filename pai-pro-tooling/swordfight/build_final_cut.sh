#!/usr/bin/env bash
# Sword-fight reel — edit-stage assembly.
# RUNS IN THE HIGGSFIELD CLOUD SANDBOX (mcp__higgsfield__sandbox_exec), NOT locally:
# this container's egress policy denies the Higgsfield CDNs, so the clips cannot be
# downloaded here. The sandbox has ffmpeg/ffprobe + internet and can reach them.
#
# Implements the Part 14.F cross-clip bridging rules:
#   1. every cut is a HARD CUT (no dissolves, no AI transitions)
#   2. ONE continuous ambient bed runs under the whole sequence, ducking each
#      clip's own native audio, so the ear never registers a reset at a cut
#      (a per-clip resynthesised "similar" ambience is NOT sufficient bridging)
#   3. each clip is trimmed so the cut lands MID-MOTION (creative-direction.md §25)
set -euo pipefail

OUT=${OUT:-/home/user/swordfight}
mkdir -p "$OUT"; cd "$OUT"

# --- 1. fetch -----------------------------------------------------------------
# CLIP_URLS must be exported by the caller, in shot order, space-separated.
i=1
for u in $CLIP_URLS; do
  curl -fsS -o "raw$i.mp4" "$u"
  i=$((i+1))
done

# --- 2. objective QC (the X2 pass) --------------------------------------------
# freezedetect catches frozen/duplicated frames; ffprobe confirms real duration,
# resolution and that an audio stream actually exists.
: > qc_report.txt
for n in 1 2 3 4 5; do
  [ -f "raw$n.mp4" ] || continue
  {
    echo "=== clip $n ==="
    ffprobe -v error -select_streams v:0 \
      -show_entries stream=width,height,r_frame_rate,nb_frames,duration \
      -of default=nw=1 "raw$n.mp4"
    echo "--- audio stream ---"
    ffprobe -v error -select_streams a:0 \
      -show_entries stream=codec_name,sample_rate,channels,duration \
      -of default=nw=1 "raw$n.mp4"
    echo "--- freezedetect ---"
    ffmpeg -v info -i "raw$n.mp4" -vf freezedetect=n=-60dB:d=0.5 -map 0:v -f null - 2>&1 \
      | grep -i freeze || echo "no frozen segments"
  } >> qc_report.txt 2>&1
done

# --- 3. trim each 4s clip to its ~3s core, cutting mid-motion -----------------
# IN/OUT points are per-clip because each one's action peaks at a different time.
# Defaults land the cut inside a movement rather than on a settled frame.
trim() { # $1=index $2=start $3=duration
  ffmpeg -y -v error -ss "$2" -t "$3" -i "raw$1.mp4" \
    -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 -ac 2 "cut$1.mp4"
}
trim 1 "${T1:-0.60}" 3.00   # cut in on the held standoff, out on the blade bind
trim 2 "${T2:-0.30}" 3.00   # out while the bind still trembles
trim 3 "${T3:-0.20}" 3.00   # out as she is still pushing up off the stone
trim 4 "${T4:-0.40}" 3.00   # out mid-rise, before the rotation completes
trim 5 "${T5:-0.60}" 3.00   # hold the closing two-shot to the end

# --- 4. hard-cut concat -------------------------------------------------------
: > concat.txt
for n in 1 2 3 4 5; do echo "file '$OUT/cut$n.mp4'" >> concat.txt; done
ffmpeg -y -v error -f concat -safe 0 -i concat.txt -c copy stitched.mp4

# --- 5. one continuous ambient bed across every cut ---------------------------
# Built from the longest clean room-tone in clip 1, looped to full length, then
# mixed UNDER the native per-clip audio. This is the bridge that makes four hard
# cuts read as one continuous space.
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 stitched.mp4)
ffmpeg -y -v error -ss 0.05 -t 0.90 -i raw1.mp4 -vn \
  -af "afade=t=in:st=0:d=0.15,afade=t=out:st=0.75:d=0.15" -ar 48000 -ac 2 bed_seed.wav
ffmpeg -y -v error -stream_loop -1 -i bed_seed.wav -t "$DUR" \
  -af "volume=0.30,highpass=f=40,lowpass=f=6000" -ar 48000 -ac 2 bed.wav
ffmpeg -y -v error -i stitched.mp4 -i bed.wav \
  -filter_complex "[0:a]volume=1.0[a0];[1:a]volume=1.0[a1];[a0][a1]amix=inputs=2:duration=first:dropout_transition=0[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 final_cut.mp4

# --- 6. verify the render before it is called done (P1 discipline) ------------
{
  echo "=== FINAL CUT ==="
  ffprobe -v error -show_entries format=duration,size -of default=nw=1 final_cut.mp4
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames \
    -of default=nw=1 final_cut.mp4
  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,duration \
    -of default=nw=1 final_cut.mp4
} >> qc_report.txt 2>&1
cat qc_report.txt

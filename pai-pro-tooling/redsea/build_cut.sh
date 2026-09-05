#!/usr/bin/env bash
# Red Sea recreation — assemble the cut in the SOURCE reel's shot order and shot lengths.
# Hard cuts only (creative-direction §16/§25): each clip is trimmed to the source shot's
# duration (min 2s shots come from 4s renders), audio edge-faded 0.08s so no cut touches
# silence abruptly, then concatenated. Hazel beats keep their full rendered length.
# usage: build_cut.sh <outfile> [--no-music]
set -e
A=/home/user/pai-pro/projects/redsea/assets
OUT="${1:-$A/redsea_cut_v1.mp4}"; NOMUSIC="${2:-}"
W=$A/work; mkdir -p "$W"; rm -f "$W"/seg_*.mp4 "$W"/list.txt

# id:trim seconds (source shot length; Hazel beats = full render)
ORDER="01:3 02:2 03:5 04:5 05:4 H1:6 06:4 07:4 08:5 09:4 10:4 11:3 12:4 H2:6 13:4 14:6 15:3 16:5 17:3 18:2 H3:4 19:2 20:2 21:2 22:4 23:5 24:4 25:2 26:2 27:2 28:4 29:4 30:2 31:9 H4:9 32:10"
i=0
for item in $ORDER; do id=${item%%:*}; d=${item##*:}; i=$((i+1)); n=$(printf "%02d" $i)
  src="$A/clips/clip${id}.mp4"; [ -f "$src" ] || { echo "MISSING $src"; exit 1; }
  # Reference timing treatments (forensic pass 3, 2026-09-05): underwater shots 25/27/30 are slow motion
  # (2x with motion interpolation, taken from 1.0s into the render so the tumble is mid-action, then
  # trimmed); the chariot charges carry a speed ramp, setpts=(PTS)/(1+k*T/4) (instantaneous speed
  # (1+k*t/4)^2, k tuned so the render's length lands exactly on its slot): 15 (4.05s -> 3s, k=0.34);
  # round 3 (2026-09-05) re-rendered 06/23/24 at 6s so they can ramp too: 06 (6.05s -> 4s, k=0.339),
  # 23 (6.05s -> 5s, k=0.139), 24 (6.05s -> 4s, k=0.339).
  vpre="scale=1080:1920,setsar=1,fps=24"; seek=""
  case "$id" in
    25|27|30) vpre="scale=1080:1920,setsar=1,setpts=2.0*(PTS-STARTPTS),minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"; seek="-ss 1.0" ;;
    15) vpre="scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+0.34*T/4)',fps=24" ;;
    06|24) vpre="scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+0.339*T/4)',fps=24" ;;
    23) vpre="scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+0.139*T/4)',fps=24" ;;
  esac
  # take the trim from the START of the render (the described action begins at 0); H3 trims nothing.
  ffmpeg -loglevel error -y $seek -i "$src" -t "$d" -vf "$vpre" \
    -af "afade=t=in:st=0:d=0.08,afade=t=out:st=$(python3 -c "print(max(0,$d-0.08))"):d=0.08,aresample=48000" \
    -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 "$W/seg_${n}_${id}.mp4"
  echo "file 'seg_${n}_${id}.mp4'" >> "$W/list.txt"
done
ffmpeg -loglevel error -y -f concat -safe 0 -i "$W/list.txt" -c copy "$W/concat.mp4"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$W/concat.mp4" | xargs -I{} echo "concat duration {}"
cp "$W/concat.mp4" "$OUT"; echo "wrote $OUT"

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

# id:trim seconds — SOURCE shot lengths measured to 0.1s (forensic pass 4, 2026-09-05); Hazel beats = full render
ORDER="01:3.5 02:1.9 03:5.1 04:5.3 05:3.6 H1:6 06:4.3 07:3.8 08:4.9 09:4.1 10:3.2 11:3.6 12:4.0 H2:6 13:4.1 14:6.0 15:3.2 16:5.0 17:2.9 18:2.2 H3:4 19:2.0 20:1.9 21:2.2 22:3.0 23:5.7 24:4.1 25:2.1 26:2.0 27:1.6 28:4.3 29:4.1 30:2.3 31:8.6 H4:9 32:8.9"
i=0
for item in $ORDER; do id=${item%%:*}; d=${item##*:}; i=$((i+1)); n=$(printf "%02d" $i)
  src="$A/clips/clip${id}.mp4"; [ -f "$src" ] || { echo "MISSING $src"; exit 1; }
  # Reference timing treatments (forensic pass 3, 2026-09-05): underwater shots 25/27/30 are 2x slow motion with
  # motion interpolation, taken from 1.0s into the render so the tumble is mid-action; the chariot charges 06/15/23/24
  # carry a speed ramp setpts=(PTS)/(1+k*T/4) (instantaneous speed (1+k*t/4)^2); 06/23/24 were re-rendered at 6s in
  # round 3 so they have the length to ramp.
  vpre="scale=1080:1920,setsar=1,fps=24"; seek=""
  # Pass-4 edit fixes (owner-approved 2026-09-05): 06 and 12 are MIRRORED (reference screen direction: chariots
  # right->left; wall on the RIGHT of the family); 32 is 2x slow motion (reference: extreme slow motion). Ramp k is
  # solved per shot so the render's real length lands exactly on its measured slot: k = (render/slot - 1) / (render/4).
  case "$id" in
    25|27|30) vpre="scale=1080:1920,setsar=1,setpts=2.0*(PTS-STARTPTS),minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"; seek="-ss 1.0" ;;
    32) vpre="scale=1080:1920,setsar=1,setpts=2.0*(PTS-STARTPTS),minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" ;;
    06) k=$(python3 -c "print(round((6.05/$d-1)/(6.05/4),4))"); vpre="hflip,scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+${k}*T/4)',fps=24" ;;
    23|24) k=$(python3 -c "print(round((6.05/$d-1)/(6.05/4),4))"); vpre="scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+${k}*T/4)',fps=24" ;;
    15) k=$(python3 -c "print(round((4.05/$d-1)/(4.05/4),4))"); vpre="scale=1080:1920,setsar=1,setpts='(PTS-STARTPTS)/(1+${k}*T/4)',fps=24" ;;
    12) vpre="hflip,scale=1080:1920,setsar=1,fps=24" ;;
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

#!/usr/bin/env bash
# Part-1 finishing: opening hook card (owner-picked 2026-09-05: ONE white box, black outline, two centered lines
# "POV: I crossed the Red Sea / with Moses in 1250 BC.", Bitstream Charter Bold 66px, y=150) for the first HOOK_S seconds,
# plus a FADE_S-second video+audio fade-out at the end. usage: hook_part1.sh <in.mp4> <out.mp4> [HOOK_S=3.0] [FADE_S=1.0]
set -e; A=/home/user/pai-pro/projects/redsea/assets; F=/usr/share/fonts/X11/Type1/c0632bt_.pfb; in=$1; out=$2; HS=${3:-3.0}; FS=${4:-1.0}
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in"); fst=$(python3 -c "print(max(0,$dur-$FS))")
o="drawtext=fontfile=$F:textfile=$A/work/hook.txt:text_align=C:line_spacing=0:fontsize=66:fontcolor=black:box=1:boxcolor=black@1.0:boxborderw=26:x=(w-text_w)/2:y=150:enable='lt(t,$HS)'"
b="drawtext=fontfile=$F:textfile=$A/work/hook.txt:text_align=C:line_spacing=0:fontsize=66:fontcolor=black:box=1:boxcolor=white@1.0:boxborderw=20:x=(w-text_w)/2:y=150:enable='lt(t,$HS)'"
ffmpeg -loglevel error -y -i "$in" -vf "$o,$b,fade=t=out:st=$fst:d=$FS" -af "afade=t=out:st=$fst:d=$FS" -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$out"
ffmpeg -loglevel error -y -i "$out" -vf scale=720:1280 -c:v libx264 -preset fast -crf 26 -c:a aac -b:a 96k "${out%.mp4}_preview.mp4"
ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -show_entries format=duration -of csv=p=0 "$out" | tr '\n' ' '; echo

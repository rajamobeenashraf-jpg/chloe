#!/usr/bin/env bash
# Part-1 opening hook (owner-picked 2026-09-05): ONE white box, black outline, two centered lines
# "POV: I crossed the Red Sea / with Moses in 1250 BC.", Bitstream Charter Bold 66px, y=150, first 1.0s only.
# usage: hook_part1.sh <in.mp4> <out.mp4>
set -e; A=/home/user/pai-pro/projects/redsea/assets; F=/usr/share/fonts/X11/Type1/c0632bt_.pfb
o="drawtext=fontfile=$F:textfile=$A/work/hook.txt:text_align=C:line_spacing=0:fontsize=66:fontcolor=black:box=1:boxcolor=black@1.0:boxborderw=26:x=(w-text_w)/2:y=150:enable='lt(t,1.0)'"
b="drawtext=fontfile=$F:textfile=$A/work/hook.txt:text_align=C:line_spacing=0:fontsize=66:fontcolor=black:box=1:boxcolor=white@1.0:boxborderw=20:x=(w-text_w)/2:y=150:enable='lt(t,1.0)'"
ffmpeg -loglevel error -y -i "$1" -vf "$o,$b" -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a copy -movflags +faststart "$2"
ffmpeg -loglevel error -y -i "$2" -vf scale=720:1280 -c:v libx264 -preset fast -crf 26 -c:a aac -b:a 96k "${2%.mp4}_preview.mp4"
ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -show_entries format=duration -of csv=p=0 "$2" | tr '\n' ' '; echo

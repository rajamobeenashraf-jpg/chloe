#!/usr/bin/env bash
# QC + stage a REGENERATED clip: download to clips/clip<ID>_v2.mp4, freezedetect, frames, preview.
# On owner approval, build_cut.sh picks up clip<ID>.mp4 — so promote with: cp clip<ID>_v2.mp4 clip<ID>.mp4
set -e; A=/home/user/pai-pro/projects/redsea/assets; id=$1; url=$2
f=$A/clips/clip${id}_v2.mp4; curl -sSo "$f" "$url"
info=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -show_entries format=duration -of csv=p=0 "$f" | tr '\n' ' ')
fz=$(ffmpeg -i "$f" -vf "freezedetect=n=0.001:d=0.5" -f null - 2>&1 | grep -c "freeze_start" || true)
ffmpeg -loglevel error -y -i "$f" -vf "select='eq(n\,0)+eq(n\,48)+eq(n\,72)',scale=360:-1,tile=3x1" -frames:v 1 "$A/qc/clip${id}_v2_frames.png"
ffmpeg -loglevel error -y -i "$f" -c:v libx264 -preset fast -crf 27 -vf scale=720:1280 -c:a aac -b:a 96k "$A/send/clip${id}_v2_preview.mp4"
echo "clip${id}_v2 | $info | freezes:$fz"

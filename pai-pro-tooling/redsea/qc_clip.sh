#!/usr/bin/env bash
# usage: qc_clip.sh <clipId> <url>  — download, freezedetect + frame strip, compressed send copy
set -e
id="$1"; url="$2"; A=/home/user/pai-pro/projects/redsea/assets
f="$A/clips/clip${id}.mp4"; curl -sSo "$f" "$url"
info=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -show_entries format=duration -of csv=p=0 "$f" | tr '\n' ' ')
fr=$(ffmpeg -i "$f" -vf "freezedetect=n=-60dB:d=0.5" -an -f null - 2>&1 | grep -c "freeze_start" || true)
aud=$(ffmpeg -i "$f" -af volumedetect -vn -f null - 2>&1 | grep -oE "mean_volume: [-0-9.]+ dB" || echo "no-audio")
d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
ffmpeg -loglevel error -y -i "$f" -vf "select='eq(n\,0)+eq(n\,$(python3 -c "print(int($d*24/2))"))+eq(n\,$(python3 -c "print(int($d*24)-2)"))',scale=360:-1,tile=3x1" -frames:v 1 -vsync vfr "$A/qc/clip${id}_frames.png"
ffmpeg -loglevel error -y -i "$f" -c:v libx264 -preset fast -crf 26 -vf scale=720:1280 -c:a aac -b:a 96k "$A/send/clip${id}_preview.mp4"
echo "clip$id | $info | freezes:$fr | $aud"

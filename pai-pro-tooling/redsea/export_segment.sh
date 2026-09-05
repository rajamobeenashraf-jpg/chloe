#!/usr/bin/env bash
# Export a frame-accurate segment of a finished master (captions, score, mix already baked in).
# usage: export_segment.sh <master.mp4> <start_s> <end_s> <out.mp4>   → also writes <out>_preview.mp4 (720x1280)
set -e; in=$1; s=$2; e=$3; out=$4
ffmpeg -loglevel error -y -ss "$s" -to "$e" -i "$in" -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$out"
ffmpeg -loglevel error -y -i "$out" -vf scale=720:1280 -c:v libx264 -preset fast -crf 26 -c:a aac -b:a 96k "${out%.mp4}_preview.mp4"
ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -show_entries format=duration -of csv=p=0 "$out" | tr '\n' ' '; echo

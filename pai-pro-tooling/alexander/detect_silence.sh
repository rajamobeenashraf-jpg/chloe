#!/bin/bash
# Alexander/Gaugamela episode — run silencedetect on each clip's audio,
# print speech (non-silence) intervals. Adapted from pai-pro-tooling/troy/.
set -e
cd "$(dirname "$0")/assets"
for n in "1" "2" "3" "4" "5a-aerial" "5a" "5b" "5c" "6a" "6b" "7" "8" "9a" "9b"; do
  f="${n}_v1.mp4"
  echo "=== clip $n ($f) ==="
  ffmpeg -i "$f" -af "silencedetect=noise=-30dB:d=0.12" -f null - 2>&1 | grep -E "silence_(start|end)" || echo "(no silence markers -- continuous speech)"
  dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f")
  echo "duration: $dur"
  echo ""
done

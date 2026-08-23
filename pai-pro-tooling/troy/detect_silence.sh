#!/bin/bash
# Run silencedetect on each clip's audio, print speech (non-silence) intervals.
set -e
cd "$(dirname "$0")/assets"
for n in $(seq 1 12); do
  f="clip${n}_v1.mp4"
  echo "=== clip $n ($f) ==="
  ffmpeg -i "$f" -af "silencedetect=noise=-30dB:d=0.12" -f null - 2>&1 | grep -E "silence_(start|end)" || echo "(no silence markers -- continuous speech)"
  dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f")
  echo "duration: $dur"
  echo ""
done

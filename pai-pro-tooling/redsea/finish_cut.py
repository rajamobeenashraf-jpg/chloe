#!/usr/bin/env python3
"""Red Sea recreation — finishing pass on the assembled cut.

Inputs : the hard-cut concat (build_cut.sh), captions/chunks.json (word-synced chunks in
         CUT time, [[start,end,"TEXT"],...]), captions/lines.json (full-line subtitles for
         Moses' Hebrew, [[start,end,"text"],...]), music/score.m4a.
Outputs: <out>.mp4 master (CRF 16) + <out>_preview.mp4 (~1.5 Mbps).

Steps (all owner-locked house rules):
  1. Captions: house word-chunk system (CLAUDE.md caption system) — Liberation Serif
     bold, spacing 2.5, white + thin dark outline, MarginV=320 @ 720x1280 PlayRes,
     hard in/out, no speaker tags. Moses' two English subtitle lines use the same style.
  1b. Moses' subtitle lines follow the REFERENCE style (forensic re-watch 2026-09-05): sans-serif,
      white/light-gold (&H00D9F2FF = warm off-white), no outline, no shadow, bottom-center at y≈85%
      (MarginV 190 @1280 → baseline ≈ 85%).
  2. Hook overlay (creative-direction §41): two stacked white rounded boxes, ~6px black
     outline, black Liberation Sans Bold text, first 1.0s only.
  3. Music: sidechain-ducked under the clip audio (Constantinople recipe), then loudnorm.
"""
import json, os, subprocess, sys

A = "/home/user/pai-pro/projects/redsea/assets"
CUT = sys.argv[1]; OUT = sys.argv[2]
HOOK1, HOOK2, HOOK3 = "EPISODE", "I crossed the Red Sea", "with Moses in 1250 BC."  # owner hook text 2026-09-05, split over two boxes to fit 1080px; EPISODE label removed on owner instruction (HOOK1 unused)
FONT_SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
FONT_SANS = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

def ts(t):
    h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"

def build_ass(chunks, lines, path):
    hdr = """[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Chunk,Liberation Serif,50,&H00FFFFFF,&H00FFFFFF,&H00202020,&H80000000,-1,0,0,0,100,100,2.5,0,1,2,1,2,60,60,320,1
Style: Line,Liberation Sans,40,&H00D9F2FF,&H00D9F2FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,60,60,190,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []
    for s, e, t in chunks:
        ev.append(f"Dialogue: 0,{ts(s)},{ts(e)},Chunk,,0,0,0,,{t.upper()}")
    for s, e, t in lines:
        ev.append(f"Dialogue: 0,{ts(s)},{ts(e)},Line,,0,0,0,,{t}")
    open(path, "w").write(hdr + "\n".join(ev) + "\n")

def main():
    chunks = json.load(open(f"{A}/captions/chunks.json"))
    lines = json.load(open(f"{A}/captions/lines.json"))
    ass = f"{A}/captions/redsea.ass"; build_ass(chunks, lines, ass)
    # hook overlay geometry (1080x1920 master): two boxes, centered, upper-middle
    def box(text, font, size, y):
        # drawbox behind drawtext: box sized to text via drawtext's box option (rounded corners not
        # available in ffmpeg drawtext; a 6px black border approximates the house outline)
        return (f"drawtext=fontfile={font}:text='{text}':fontsize={size}:fontcolor=black:"
                f"box=1:boxcolor=white@1.0:boxborderw=22:x=(w-text_w)/2:y={y}:enable='lt(t,1.0)'")
    def outline(text, font, size, y):
        return (f"drawtext=fontfile={font}:text='{text}':fontsize={size}:fontcolor=black:"
                f"box=1:boxcolor=black@1.0:boxborderw=28:x=(w-text_w)/2:y={y}:enable='lt(t,1.0)'")
    vf = ",".join([
        outline(HOOK2, FONT_SANS, 72, 620), box(HOOK2, FONT_SANS, 72, 620),
        outline(HOOK3, FONT_SANS, 72, 760), box(HOOK3, FONT_SANS, 72, 760),
        f"subtitles={ass}:fontsdir=/usr/share/fonts/truetype/liberation",
    ])
    music = f"{A}/music/score.m4a"
    af = ("[1:a]volume=0.5[m];[0:a]asplit=2[dry][sc];"
          "[m][sc]sidechaincompress=threshold=0.05:ratio=6:attack=40:release=600:makeup=1[duck];"
          "[dry][duck]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,"
          "loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", CUT, "-i", music,
                    "-filter_complex", f"[0:v]{vf}[vout];{af}", "-map", "[vout]", "-map", "[aout]",
                    "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", OUT], check=True)
    prev = OUT.replace(".mp4", "_preview.mp4")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", OUT, "-c:v", "libx264", "-preset", "fast",
                    "-crf", "26", "-vf", "scale=720:1280", "-c:a", "aac", "-b:a", "96k", prev], check=True)
    for f in (OUT, prev):
        d = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
                            "-show_entries", "stream=nb_read_frames", "-show_entries", "format=duration",
                            "-of", "csv=p=0", f], capture_output=True, text=True).stdout.split()
        print(os.path.basename(f), d)

if __name__ == "__main__":
    main()

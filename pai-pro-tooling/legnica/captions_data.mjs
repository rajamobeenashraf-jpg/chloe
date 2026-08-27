// Legnica episode — caption cue data for qc_pass.mjs.
// Word-synced CHUNK captions per the owner-locked caption system
// (CLAUDE.md): 1-2 word ALL-CAPS chunks, each replacing the previous,
// on screen only while spoken; pauses >= 0.35s leave the screen
// caption-free; hard cut in/out, no animation, serif style (SUB_STYLE).
//
// TIMING SOURCE: measured per-word timestamps from faster-whisper
// (small.en, int8, script-biased initial_prompt), run via
// make_word_chunks.py on each clip's own rendered audio. Script text is
// ground truth; whisper only carries timing. Manual correction applied
// to clip2 (corrections.json) after frame-verification found the
// interpolated opening-line window compressed/mistimed against actual
// visible speech, plus a zero-duration "ENOUGH." cue that would not
// have displayed at all — see production log for the full diagnosis.
// clip6 and clip10B have no dialogue (music/visual-only clips).

export const CLIPS = [
  {
    "id": "clip1",
    "duration": 7.041667,
    "captions": [
      {
        "start": 0,
        "end": 1.94,
        "text": "APRIL, 1241."
      },
      {
        "start": 2.92,
        "end": 3.12,
        "text": "EUROPE IS"
      },
      {
        "start": 3.12,
        "end": 3.46,
        "text": "ABOUT TO"
      },
      {
        "start": 3.46,
        "end": 3.86,
        "text": "FACE THE"
      },
      {
        "start": 3.86,
        "end": 4.4,
        "text": "MONGOLS."
      }
    ]
  },
  {
    "id": "clip1B",
    "duration": 11.041667,
    "captions": [
      {
        "start": 1,
        "end": 1.651,
        "text": "GRANDSONS OF"
      },
      {
        "start": 1.651,
        "end": 2.48,
        "text": "GENGHIS KHAN..."
      },
      {
        "start": 2.48,
        "end": 3.44,
        "text": "YOU ALREADY"
      },
      {
        "start": 3.44,
        "end": 4.22,
        "text": "BURNED BEIJING"
      },
      {
        "start": 4.22,
        "end": 4.62,
        "text": "TO THE"
      },
      {
        "start": 4.62,
        "end": 4.92,
        "text": "GROUND."
      },
      {
        "start": 5.1,
        "end": 5.42,
        "text": "WHY ARE"
      },
      {
        "start": 5.42,
        "end": 5.92,
        "text": "YOU HERE?"
      },
      {
        "start": 6.16,
        "end": 6.46,
        "text": "THE WORLD"
      },
      {
        "start": 6.46,
        "end": 6.86,
        "text": "IS NOT"
      },
      {
        "start": 6.86,
        "end": 7.5,
        "text": "SO EASILY"
      },
      {
        "start": 7.5,
        "end": 7.94,
        "text": "FINISHED."
      }
    ]
  },
  {
    "id": "clip2",
    "duration": 12.041667,
    "captions": [
      {
        "start": 0,
        "end": 0.35,
        "text": "DUKE HENRY"
      },
      {
        "start": 0.35,
        "end": 0.65,
        "text": "THE SECOND."
      },
      {
        "start": 0.65,
        "end": 0.95,
        "text": "HE'S LEADING"
      },
      {
        "start": 0.95,
        "end": 1.2,
        "text": "THEM."
      },
      {
        "start": 3.75,
        "end": 4.1,
        "text": "HOW MANY"
      },
      {
        "start": 4.1,
        "end": 4.42,
        "text": "ARE WE"
      },
      {
        "start": 4.42,
        "end": 4.66,
        "text": "FIGHTING?"
      },
      {
        "start": 5.8,
        "end": 6.3,
        "text": "ENOUGH."
      },
      {
        "start": 8.04,
        "end": 8.88,
        "text": "HOLD THE"
      },
      {
        "start": 8.88,
        "end": 9.38,
        "text": "LINE!"
      }
    ]
  },
  {
    "id": "clip3",
    "duration": 12.041667,
    "captions": [
      {
        "start": 1.16,
        "end": 1.82,
        "text": "THEY'RE MOVING—"
      },
      {
        "start": 4.38,
        "end": 4.8,
        "text": "WAIT— THEY'RE"
      },
      {
        "start": 4.8,
        "end": 5.2,
        "text": "RETREATING?"
      },
      {
        "start": 6.66,
        "end": 6.96,
        "text": "NO."
      },
      {
        "start": 7.7,
        "end": 7.92,
        "text": "WATCH."
      },
      {
        "start": 8.48,
        "end": 8.7,
        "text": "THIS IS"
      },
      {
        "start": 8.7,
        "end": 8.98,
        "text": "WHAT THEY"
      },
      {
        "start": 8.98,
        "end": 9.18,
        "text": "DO —"
      },
      {
        "start": 9.56,
        "end": 9.98,
        "text": "THEY LURE"
      },
      {
        "start": 9.98,
        "end": 10.34,
        "text": "YOU INTO"
      },
      {
        "start": 10.34,
        "end": 10.92,
        "text": "CHASING THEM,"
      },
      {
        "start": 10.92,
        "end": 11.14,
        "text": "THEN THEY"
      },
      {
        "start": 11.14,
        "end": 11.5,
        "text": "TURN BACK"
      },
      {
        "start": 11.5,
        "end": 11.86,
        "text": "AND FINISH"
      },
      {
        "start": 11.86,
        "end": 12.02,
        "text": "YOU."
      }
    ]
  },
  {
    "id": "clip4",
    "duration": 5.041667,
    "captions": [
      {
        "start": 0.86,
        "end": 1.84,
        "text": "THEY'RE FLEEING!"
      },
      {
        "start": 2.42,
        "end": 2.98,
        "text": "AFTER THEM!"
      },
      {
        "start": 3.34,
        "end": 4.32,
        "text": "NO— DON'T"
      },
      {
        "start": 4.32,
        "end": 4.84,
        "text": "CHASE THEM!"
      }
    ]
  },
  {
    "id": "clip5",
    "duration": 11.041667,
    "captions": [
      {
        "start": 4.56,
        "end": 5.18,
        "text": "THEY PULLED"
      },
      {
        "start": 5.18,
        "end": 5.56,
        "text": "THEM STRAIGHT"
      },
      {
        "start": 5.56,
        "end": 5.84,
        "text": "OUT OF"
      },
      {
        "start": 5.84,
        "end": 6.24,
        "text": "FORMATION."
      },
      {
        "start": 6.88,
        "end": 7.28,
        "text": "JUST LIKE"
      },
      {
        "start": 7.28,
        "end": 7.68,
        "text": "I TOLD"
      },
      {
        "start": 7.68,
        "end": 8.1,
        "text": "THEM—"
      }
    ]
  },
  {
    "id": "clip6",
    "duration": 4.041667,
    "captions": []
  },
  {
    "id": "clip7",
    "duration": 6.041667,
    "captions": [
      {
        "start": 1.78,
        "end": 2.56,
        "text": "THEY AREN'T"
      },
      {
        "start": 2.56,
        "end": 3.06,
        "text": "FIGHTING US"
      },
      {
        "start": 3.06,
        "end": 5.22,
        "text": "HEAD-ON—THEY'RE SURROUNDING"
      },
      {
        "start": 5.22,
        "end": 5.42,
        "text": "US!"
      }
    ]
  },
  {
    "id": "clip8",
    "duration": 6.041667,
    "captions": [
      {
        "start": 0.78,
        "end": 3.76,
        "text": "HENRY'S STILL"
      },
      {
        "start": 3.76,
        "end": 4.8,
        "text": "FIGHTING..."
      },
      {
        "start": 4.8,
        "end": 5.36,
        "text": "THEY'RE SURROUNDING"
      },
      {
        "start": 5.36,
        "end": 5.7,
        "text": "HIM."
      }
    ]
  },
  {
    "id": "clip9",
    "duration": 5.625,
    "captions": [
      {
        "start": 1.52,
        "end": 1.78,
        "text": "NO—"
      }
    ]
  },
  {
    "id": "clip10",
    "duration": 4.458337,
    "captions": [
      {
        "start": 2.74,
        "end": 3.94,
        "text": "HENRY II"
      },
      {
        "start": 3.94,
        "end": 4.52,
        "text": "IS DEAD."
      }
    ]
  },
  {
    "id": "clip10B",
    "duration": 9.041667,
    "captions": []
  },
  {
    "id": "clip11",
    "duration": 10.041667,
    "captions": [
      {
        "start": 0,
        "end": 1.18,
        "text": "HENRY DIED"
      },
      {
        "start": 1.18,
        "end": 1.56,
        "text": "HERE."
      },
      {
        "start": 2.32,
        "end": 2.74,
        "text": "HIS ARMY"
      },
      {
        "start": 2.74,
        "end": 3.36,
        "text": "WAS BROKEN."
      },
      {
        "start": 4.08,
        "end": 4.52,
        "text": "BUT THIS"
      },
      {
        "start": 4.52,
        "end": 5.2,
        "text": "CASTLE — THE"
      },
      {
        "start": 5.2,
        "end": 5.66,
        "text": "ONE BEHIND"
      },
      {
        "start": 5.66,
        "end": 6.08,
        "text": "ME — NEVER"
      },
      {
        "start": 6.08,
        "end": 6.36,
        "text": "FELL."
      },
      {
        "start": 7.18,
        "end": 7.54,
        "text": "THEY HELD"
      },
      {
        "start": 7.54,
        "end": 7.98,
        "text": "IT."
      },
      {
        "start": 8.6,
        "end": 9.04,
        "text": "EVEN AFTER"
      },
      {
        "start": 9.04,
        "end": 9.48,
        "text": "EVERYTHING."
      }
    ]
  }
];

export const SUB_STYLE = {
  fontName: "Liberation Serif",
  fontSize: 50,
  outline: 2,
  shadow: 1,
  marginV: 320,
  marginLR: 60,
  spacing: 2.5,
};

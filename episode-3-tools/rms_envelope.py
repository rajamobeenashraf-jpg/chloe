#!/usr/bin/env python3
# Fine-grained RMS energy envelope from a band-passed mono WAV, for precise
# manual caption placement where automatic silencedetect can't separate
# speech from background noise. Prints time, RMS(dB) per window.
import sys, wave, array, math

def rms_envelope(path, window_ms=40):
    w = wave.open(path, 'rb')
    sr = w.getframerate()
    n = w.getnframes()
    raw = w.readframes(n)
    samples = array.array('h')
    samples.frombytes(raw)
    win = int(sr * window_ms / 1000)
    out = []
    for i in range(0, len(samples), win):
        chunk = samples[i:i+win]
        if not chunk: continue
        ms = sum(s*s for s in chunk) / len(chunk)
        db = 10*math.log10(ms/ (32768.0**2) + 1e-12)
        t = i / sr
        out.append((t, db))
    return out

if __name__ == "__main__":
    path = sys.argv[1]
    t0 = float(sys.argv[2]) if len(sys.argv) > 2 else 0
    t1 = float(sys.argv[3]) if len(sys.argv) > 3 else 999
    for t, db in rms_envelope(path):
        if t0 <= t <= t1:
            bar = "#" * max(0, int((db+60)/1.5))
            print(f"{t:6.2f}s {db:6.1f}dB {bar}")

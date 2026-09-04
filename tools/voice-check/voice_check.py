#!/usr/bin/env python3
"""Voice check — the owner-locked 12-point plain-English 'Chloe voice' gate
(creative-direction.md §28, owner mandate 2026-08-27).

Usage:  python3 tools/voice-check/voice_check.py <dialogue.txt> [--register epic|comedy]

Input: a plain-text file containing ONLY the episode's spoken dialogue
(Hazel + NPC lines, no stage directions). Reports the measurable spec and
flags lines for the manual pass. Reference bands measured from six Chloe VS
History transcripts (study: chloe-constantinople-1453-study.md §11):
  FK grade <= 5.0 · >= 90% words of 1-2 syllables · <= ~10 words/sentence avg.

PASS here is necessary, not sufficient: points 1-3, 5, 10-12 (deixis,
So/Okay openers, present tense, same-breath glossing, question-then-answer,
named agents, register rules) still need the human read — this tool prints
the checklist so that read never gets skipped.
"""
import re, sys

def syllables(w):
    w = w.lower().strip("'")
    if not w: return 1
    groups = re.findall(r'[aeiouy]+', w)
    n = len(groups)
    if w.endswith('e') and n > 1 and not w.endswith(('le', 'ee', 'ye')): n -= 1
    return max(1, n)

COMMON_POLY = {  # everyday 3+ syllable words she actually uses — not flagged
    'actually','basically','apparently','honestly','genuinely','absolutely',
    'literally','probably','nobody','everyone','everybody','everything',
    'everywhere','anybody','anything','somebody','something','somewhere',
    'every','already','another','tomorrow','yesterday','history','family',
    'beautiful','incredible','amazing','area','idea','remember','understand',
}
PASSIVE_HINT = re.compile(r'\b(is|are|was|were|been|being|be)\s+\w+(ed|en)\b', re.I)

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    register = 'epic'
    if '--register' in sys.argv:
        register = sys.argv[sys.argv.index('--register') + 1]
    tx = open(sys.argv[1]).read()
    tx = re.sub(r'\[.*?\]', ' ', tx)
    sents = [s.strip() for s in re.split(r'[.!?]+', tx) if s.strip()]
    words = re.findall(r"[A-Za-z']+", tx)
    if not words:
        print('No dialogue found.'); sys.exit(2)
    syl = [syllables(w) for w in words]
    simple = sum(1 for s in syl if s <= 2) / len(words) * 100
    wps = len(words) / max(1, len(sents))
    spw = sum(syl) / len(words)
    fk = 0.39 * wps + 11.8 * spw - 15.59

    print(f'words={len(words)}  sentences={len(sents)}  words/sentence={wps:.1f}')
    print(f'1-2 syllable words: {simple:.1f}%   FK grade: {fk:.1f}')
    print(f'word budget note: her measured epics run ~170 wpm — check words vs runtime.')

    ok = True
    if fk > 5.0:  print(f'FAIL: FK grade {fk:.1f} > 5.0'); ok = False
    if simple < 90.0: print(f'FAIL: only {simple:.1f}% short words (< 90%)'); ok = False
    if wps > 10.0: print(f'FAIL: avg sentence {wps:.1f} words (> 10)'); ok = False

    hard = sorted({w.lower() for w in words
                   if syllables(w) >= 3 and w.lower() not in COMMON_POLY})
    if hard:
        print('\nREVIEW — 3+ syllable words (each must be a proper noun, an era term')
        print('glossed in the SAME breath, or rewritten):')
        print('  ' + ', '.join(hard))

    passives = [s for s in sents if PASSIVE_HINT.search(s)]
    if passives:
        print('\nREVIEW — possible passive voice (rule 11: name the doer):')
        for s in passives[:10]: print('  - ' + s)

    print(f'\nregister={register}: ' + (
        'ZERO slang/idiom/wordplay allowed (epic/doom).' if register == 'epic'
        else 'light slang allowed ONLY where the joke lands without it — flag every slang line to the owner.'))
    print('\nManual pass (rules 1-3, 5-8, 10-12 — confirm each): point-and-name deixis /')
    print('So+Okay openers / present tense / same-breath gloss on every term / plain')
    print('anchored numbers, repeated / noun triads / repetition beats / question-then-')
    print('answer framing / named agents / register rule above.')
    print('\nRESULT: ' + ('PASS (metrics)' if ok else 'FAIL (metrics)'))
    sys.exit(0 if ok else 1)

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Text, rules and neutral greys to black ink only (K), in every content stream.

Chrome emits RGB only, so Ghostscript turns a dark text grey (the book's
charcoal #1a1a1a) into a four-colour black of 250 per cent ink or more. At
9 pt that shows every registration error; the prepress rule is text in K
only. On uncoated stock K 100 is as dark as the four-colour black.

The dominant dark fill (the running text) is found in the PDF rather than
hard-coded, because the exact tuple depends on the profile. Other neutral
greys go to the K of the same lightness, computed through the paper
profile; non-neutral colours (marine, sail) stay in four colours.

Usage: python3 scripts/press/blacktext.py in.pdf out.pdf profile.icc

Adapted from Littlpinguin/marketing-cockpit-template, 14-print/lib/blacktext.py
(MIT licence, see LICENSE-marketing-cockpit-template). Logic unchanged;
comments translated.
"""
import collections
import os
import re
import sys

import fitz

if len(sys.argv) < 3:
    sys.exit(__doc__)
src, dst = sys.argv[1], sys.argv[2]
ICC = (sys.argv[3] if len(sys.argv) > 3 else
       os.environ.get("ICC_PROFIL") or
       os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icc",
                    "PSOuncoated_v3_FOGRA52.icc"))
doc = fitz.open(src)
TUPLE = re.compile(r'\b(\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+) (k|K)\b')


def flux_de_contenu():
    """Tous les flux qui portent des opérateurs graphiques : contenus de page et XObjects Form."""
    vus = set()
    for page in doc:
        for x in page.get_contents():
            if x not in vus:
                vus.add(x)
                yield x
    for xref in range(1, doc.xref_length()):
        if xref in vus or not doc.xref_is_stream(xref):
            continue
        if '/Form' in doc.xref_object(xref, compressed=False):
            vus.add(xref)
            yield xref


# 1. Relever le noir dominant : le tuple sombre le plus fréquent (somme > 2.2, K > .5).
compte = collections.Counter()
for xref in list(flux_de_contenu()):
    s = doc.xref_stream(xref).decode('latin1', errors='ignore')
    for m in TUPLE.finditer(s):
        c, mm, y, k = (float(m.group(i)) for i in range(1, 5))
        if c + mm + y + k > 2.2 and k > .5:
            compte[m.group(0)[:-2]] += 1
if not compte:
    print("no four-colour black found")
    doc.save(dst)
    sys.exit(0)
noir, n_occ = compte.most_common(1)[0]
pat = re.compile(re.escape(noir) + r' (k|K)\b')


# 1 bis. Les autres neutral greys : convertis vers le K de même clarté (profil du papier).
def lab(cmjn):
    from PIL import Image, ImageCms
    im = Image.new("CMYK", (1, 1), tuple(round(v * 255) for v in cmjn))
    out = ImageCms.profileToProfile(im, ICC, ImageCms.createProfile("LAB"),
                                    outputMode="LAB", renderingIntent=1)
    L, a, b = out.getpixel((0, 0))
    return L * 100 / 255, a - 128, b - 128


def k_equivalent(cmjn):
    """K seul de même clarté, ou None si la couleur n'est pas neutre."""
    try:
        L, a, b = lab(cmjn)
    except Exception:
        return None
    if abs(a) > 4 or abs(b) > 4:          # couleur de marque : on n'y touche pas
        return None
    lo, hi = 0.0, 1.0
    for _ in range(14):                    # dichotomie sur K
        mid = (lo + hi) / 2
        if lab((0, 0, 0, mid))[0] > L:
            lo = mid
        else:
            hi = mid
    return round((lo + hi) / 2, 3)


gris = collections.Counter()
for xref in list(flux_de_contenu()):
    s = doc.xref_stream(xref).decode('latin1', errors='ignore')
    for m in TUPLE.finditer(s):
        t = m.group(0)[:-2]
        if t != noir:
            gris[t] += 1
remplaces = {}
if os.path.exists(ICC):
    for t in gris:
        cmjn = tuple(float(v) for v in t.split())
        if sum(cmjn) < .15:                # quasi blanc : rien à gagner
            continue
        k = k_equivalent(cmjn)
        if k is not None and k > .02:
            remplaces[t] = k
else:
    print(f"profile not found ({ICC}) : only the dominant black goes to K")

# 2. Substituer par K seul.
n, m_autres = 0, 0
motifs = [(pat, '0 0 0 1 ')] + [(re.compile(re.escape(t) + r' (k|K)\b'), f'0 0 0 {v} ')
                                for t, v in remplaces.items()]
for xref in list(flux_de_contenu()):
    s = doc.xref_stream(xref).decode('latin1', errors='ignore')
    total = 0
    for i, (p_, rempl) in enumerate(motifs):
        s, k = p_.subn(lambda mm: rempl + mm.group(1), s)
        total += k
        if i == 0:
            n += k
        else:
            m_autres += k
    if total:
        doc.update_stream(xref, s.encode('latin1'))
doc.save(dst, garbage=1, deflate=True)
print(f"dominant black : {noir} k ({n_occ} occurrences) -> {n} fills set to K 100")
for t, v in remplaces.items():
    print(f"  neutral grey {t} k -> K {v*100:.0f}%")
if m_autres:
    print(f"  {m_autres} neutral grey fills set to K only")

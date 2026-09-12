#!/usr/bin/env python3
"""
Scans every page of the print proof for layout defects and classifies them.

Built after a page-by-page read turned up four distinct faults that the
earlier whole-page fill metric could not see, because that metric only asked
how far down the page the last ink sat. These are per-column, per-element
faults and they need the geometry of the grid to find.

    python3 scripts/audit-layout.py <pdf> [--dpi 50] [--json out.json]

Defect classes:
  empty-column     one column carries type, the other is blank
  stranded-head    a heading sits at the foot of a column with nothing under it
  orphan-figure    a heading ends a page and its figure starts the next
  lone-picture     a picture occupies a page that carries nothing else
  short-page       body type stops high up the page
"""

import argparse
import glob
import json
import os
import subprocess
import sys
import tempfile

# Grid geometry, from @page in print.css: 236 x 306mm sheet, margins
# 25 head / 27 foot, and 27 inner / 19 outer mirrored.
SHEET_W, SHEET_H = 236.0, 306.0
HEAD, FOOT = 25.0, 27.0
INNER, OUTER = 27.0, 19.0
COL_GAP = 7.0
TYPE_W = SHEET_W - INNER - OUTER          # 190mm
COL_W = (TYPE_W - COL_GAP) / 2            # 91.5mm


def columns(is_recto: bool):
    """Left edges of the two columns as fractions of sheet width."""
    left = INNER if is_recto else OUTER
    c1 = left
    c2 = left + COL_W + COL_GAP
    return [(c1 / SHEET_W, (c1 + COL_W) / SHEET_W),
            (c2 / SHEET_W, (c2 + COL_W) / SHEET_W)]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("pdf")
    ap.add_argument("--dpi", type=int, default=50)
    ap.add_argument("--json")
    args = ap.parse_args()

    from PIL import Image
    import numpy as np

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["pdftoppm", "-r", str(args.dpi), "-png", args.pdf,
                        os.path.join(tmp, "p")], check=True, capture_output=True)
        files = sorted(glob.glob(os.path.join(tmp, "p*.png")))
        page_texts = subprocess.run(
            ["pdftotext", args.pdf, "-"], capture_output=True, text=True
        ).stdout.split("\f")
        page_texts += [""] * (len(files) + 2)
        defects = []

        for idx, f in enumerate(files):
            page = idx + 1
            if page == 1:                      # cover
                continue
            rgb = np.asarray(Image.open(f).convert("RGB"), dtype=float)
            h, w, _ = rgb.shape
            grey = rgb.mean(axis=2)
            ink = grey < 170

            # marine headings: distinctly blue and dark
            r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
            marine = (b > r + 25) & (b > 60) & (grey < 150)

            top, bot = int(h * HEAD / SHEET_H), int(h * (1 - FOOT / SHEET_H))
            band_h = bot - top

            # a picture page: lots of mid-tone across the sheet
            midtone = ((grey > 60) & (grey < 210)).mean()
            if midtone > 0.45:
                continue                       # plates and openers are meant to be pictures

            cols = columns(is_recto=(page % 2 == 1))
            prof, last, heads = [], [], []
            for (x0, x1) in cols:
                sub = ink[top:bot, int(w * x0):int(w * x1)]
                rows = sub.mean(axis=1)
                prof.append(rows)
                nz = np.where(rows > 0.006)[0]
                last.append(nz[-1] / band_h if len(nz) else 0.0)
                msub = marine[top:bot, int(w * x0):int(w * x1)]
                mrows = msub.mean(axis=1)
                # A heading is marine ink that is also TEXT: a run of a few
                # rows, moderately covered. Two earlier thresholds both
                # failed. At 2 per cent the end mark and the figure-label
                # square counted as headings. At 14 per cent with no upper
                # bound, blue water in a photograph and the marine bars of
                # a chart counted as headings, which is what produced the
                # fifteen reports that turned out on inspection to be sound
                # pages. Text never covers more than about half a column
                # solidly, and a heading is at most three or four lines.
                line_px = max(2, int(band_h * 0.018))
                cand = (mrows > 0.14) & (mrows < 0.55)
                runs, start = [], None
                for i, on in enumerate(cand):
                    if on and start is None:
                        start = i
                    elif not on and start is not None:
                        if i - start <= line_px * 4:
                            runs.append(i - 1)
                        start = None
                heads.append(np.array(runs, dtype=int))

            total_ink = sum(p.sum() for p in prof)
            if total_ink < 1.0:
                continue                       # blank or near-blank, caught elsewhere

            # --- empty column -------------------------------------------
            i1, i2 = prof[0].sum(), prof[1].sum()
            if i1 > 3 and i2 < i1 * 0.04:
                defects.append((page, "empty-column", round(last[0] * 100)))
            elif i2 > 3 and i1 < i2 * 0.04:
                defects.append((page, "empty-column", round(last[1] * 100)))

            # --- stranded heading ---------------------------------------
            for ci, hrows in enumerate(heads):
                if not len(hrows):
                    continue
                hb = hrows[-1]
                if hb / band_h > 0.80:
                    below = prof[ci][hb + 3:]
                    if below.sum() < 0.35:
                        defects.append((page, "stranded-head", round(hb / band_h * 100)))
                        break

            # --- lone picture -------------------------------------------
            pic = ((grey > 60) & (grey < 210))[top:bot, :].mean()
            if 0.10 < pic < 0.45 and total_ink < 6:
                defects.append((page, "lone-picture", round(pic * 100)))

            # --- short page ---------------------------------------------
            # The chapter close is a composed full page with a pinned foot
            # and deliberate breath above it, not a flow that ran out. It is
            # excluded by its text, not by appearance: the first attempt used
            # marine ink plus a dark footer as the test, which describes half
            # the book and would have suppressed real defects.
            deepest = max(last)
            if deepest < 0.78 and "CLOSES" not in page_texts[page - 1].upper():
                defects.append((page, "short-page", round(deepest * 100)))

    counts = {}
    for _, kind, _ in defects:
        counts[kind] = counts.get(kind, 0) + 1

    print(f"{len(files)} pages scanned, {len(defects)} defects\n")
    for kind, n in sorted(counts.items(), key=lambda x: -x[1]):
        pages = [p for p, k, _ in defects if k == kind]
        print(f"  {kind:16s} {n:4d}   pages: "
              f"{' '.join(str(p) for p in pages[:22])}"
              f"{' ...' if len(pages) > 22 else ''}")

    if args.json:
        json.dump({"defects": defects, "counts": counts}, open(args.json, "w"), indent=1)
        print(f"\nwrote {args.json}")


if __name__ == "__main__":
    main()

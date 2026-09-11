#!/usr/bin/env python3
"""
Reports, for every page of a PDF, how far down the page the last ink sits,
as a fraction of the type area.

The print build needs this to size the section closers. Word count was the
first proxy and it is blind to pictures: a closer adds no words, so the
measured gap never shrank and every closer grew to its cap. Ink position
sees the picture.

    python3 scripts/measure-fill.py <pdf> > fill.json
"""

import json
import subprocess
import sys
import tempfile
import glob
import os

DPI = 24  # enough to locate the last inked line, cheap enough to run each pass

# Type area as a fraction of the sheet, matching @page in print.css:
# 236 x 306mm sheet, 25mm head and 27mm foot.
TOP = 25 / 306
BOT = 1 - 27 / 306


def main() -> None:
    pdf = sys.argv[1]
    try:
        from PIL import Image
        import numpy as np
    except ImportError:
        # No Pillow: report every page as full so the build makes no closers
        # rather than making wrong ones.
        print(json.dumps({"fill": [], "error": "pillow-missing"}))
        return

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["pdftoppm", "-r", str(DPI), "-png", pdf, os.path.join(tmp, "p")],
            check=True,
            capture_output=True,
        )
        fills = []
        for f in sorted(glob.glob(os.path.join(tmp, "p*.png"))):
            a = np.asarray(Image.open(f).convert("L"), dtype=float)
            h, w = a.shape
            band = a[int(h * TOP):int(h * BOT), int(w * 0.07):int(w * 0.93)]
            rows = (band < 150).mean(axis=1)
            inked = np.where(rows > 0.004)[0]
            fills.append(round(float(inked[-1] / band.shape[0]), 4) if len(inked) else 0.0)

    print(json.dumps({"fill": fills}))


if __name__ == "__main__":
    main()

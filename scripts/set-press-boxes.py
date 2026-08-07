#!/usr/bin/env python3
"""Stamp press geometry boxes onto a printed PDF.

The sheet is trim + 3 mm bleed on every edge (236 x 306 mm for a
230 x 300 mm trim). MediaBox and BleedBox stay at the full sheet;
TrimBox (and ArtBox) are inset 3 mm so the printer knows the cut.
Rewrites the file in place.
"""

import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

MM = 72 / 25.4
BLEED = 3 * MM


def main(path: str) -> None:
    reader = PdfReader(path)
    writer = PdfWriter()
    for page in reader.pages:
        media = page.mediabox
        trim = RectangleObject(
            (
                float(media.left) + BLEED,
                float(media.bottom) + BLEED,
                float(media.right) - BLEED,
                float(media.top) - BLEED,
            )
        )
        page.trimbox = trim
        page.artbox = trim
        page.bleedbox = RectangleObject(
            (float(media.left), float(media.bottom), float(media.right), float(media.top))
        )
        writer.add_page(page)
    with open(path, "wb") as fh:
        writer.write(fh)


if __name__ == "__main__":
    main(sys.argv[1])

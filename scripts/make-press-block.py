#!/usr/bin/env python3
"""Build the press block from the merged proof PDF.

Usage: make-press-block.py <proof.pdf> <out.pdf> <blank_template_page>

- Drops page 1 (the prepended cover; the cover is the case, not a block
  page).
- Pads the tail with copies of a known blank paper page (a parity
  spacer) until the block is a multiple of 8 pages, so the printer can
  impose 16- and 8-page signatures without loose leaves.
- Stamps TrimBox/ArtBox (3 mm inset) and BleedBox on every page.

<blank_template_page> is the 1-based page number IN THE PROOF of a
blank paper page to clone for padding.
"""

import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

MM = 72 / 25.4
BLEED = 3 * MM
SIGNATURE_MULTIPLE = 8


def main(src: str, dst: str, blank_page_no: int) -> None:
    reader = PdfReader(src)
    writer = PdfWriter()

    block = list(reader.pages[1:])  # drop the cover
    blank = reader.pages[blank_page_no - 1]

    pad = (-len(block)) % SIGNATURE_MULTIPLE
    for page in block:
        writer.add_page(page)
    for _ in range(pad):
        writer.add_page(blank)

    for page in writer.pages:
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

    with open(dst, "wb") as fh:
        writer.write(fh)
    print(f"block={len(block)} pad={pad} total={len(block) + pad}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], int(sys.argv[3]))

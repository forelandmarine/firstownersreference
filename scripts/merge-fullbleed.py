#!/usr/bin/env python3
"""Replace flow-document placeholder pages with standalone full-bleed pages.

Takes one argument: a JSON spec file
  { "base": <pdf>, "out": <pdf>, "replace": { "<pageNo>": <pdf>, ... } }
Page numbers are 1-based. Each replacement PDF's first page is used.
"""

import json
import sys

from pypdf import PdfReader, PdfWriter


def main(spec_path: str) -> None:
    with open(spec_path) as fh:
        spec = json.load(fh)
    base = PdfReader(spec["base"])
    replacements = {int(k): PdfReader(v).pages[0] for k, v in spec["replace"].items()}
    writer = PdfWriter()
    for pre in spec.get("prepend", []):
        writer.add_page(PdfReader(pre).pages[0])
    for i, page in enumerate(base.pages, 1):
        writer.add_page(replacements.get(i, page))
    with open(spec["out"], "wb") as fh:
        writer.write(fh)


if __name__ == "__main__":
    main(sys.argv[1])

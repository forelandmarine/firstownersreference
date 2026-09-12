#!/usr/bin/env python3
"""
Finds headings stranded at the foot of a column, from the PDF text layer.

Two pixel-based attempts failed before this one. Marine ink is not a
reliable signal for a heading: the end mark, the figure-label square, the
bars of a chart and blue water in a photograph are all marine too, and both
threshold schemes reported sound pages as defective. This script does not
guess. It reads the heading strings out of content/ and finds exactly those
words in the PDF, with their coordinates.

    python3 scripts/audit-headings.py <pdf>
"""

import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Grid, matching @page in print.css.
SHEET_W, SHEET_H = 236.0, 306.0
HEAD, FOOT = 25.0, 27.0
INNER, OUTER = 27.0, 19.0
COL_GAP, TYPE_W = 7.0, 190.0
COL_W = (TYPE_W - COL_GAP) / 2

# A heading is stranded if it sits below this fraction of the type band
# and carries fewer than MIN_WORDS words beneath it in its own column.
FOOT_ZONE = 0.78
MIN_WORDS = 14


def heading_strings() -> set[str]:
    out: set[str] = set()

    def walk(blocks):
        for b in blocks:
            if isinstance(b, dict) and b.get("type") == "h2" and b.get("text"):
                out.add(b["text"].strip())

    for name, key in (("lead-essays.json", "paragraphs"),
                      ("cases.json", "paragraphs"),
                      ("data-spreads.json", "blocks")):
        data = json.loads((ROOT / "content" / name).read_text())
        for v in data.values():
            walk(v.get(key, []))

    guests = json.loads((ROOT / "content" / "guest-opinions.json").read_text())
    for v in guests.values():
        # each chapter maps to a LIST of opinion pieces, not one object
        for piece in v if isinstance(v, list) else [v]:
            for qa in piece.get("questions", []):
                if qa.get("question"):
                    out.add(qa["question"].strip())

    return {h for h in out if len(h.split()) >= 2}


def main() -> None:
    pdf = sys.argv[1]
    heads = heading_strings()
    first_words = {}
    for h in heads:
        key = tuple(re.sub(r"[^\w]", "", w).lower() for w in h.split()[:3])
        first_words.setdefault(key, h)

    xml = subprocess.run(["pdftotext", "-bbox", pdf, "-"],
                         capture_output=True, text=True).stdout
    root = ET.fromstring(xml)
    ns = {"x": root.tag.split("}")[0].strip("{")} if "}" in root.tag else {}
    pages = root.findall(".//x:page", ns) if ns else root.findall(".//page")

    # Chapter openers and plates put their title and standfirst low on a
    # full-bleed picture with nothing under them, which is the design. They
    # are not stranded headings and must not be counted as such.
    raw = subprocess.run(["pdftotext", pdf, "-"],
                         capture_output=True, text=True).stdout.split("\f")
    picture_pages = {
        i + 1 for i, t in enumerate(raw)
        if "[[CH" in t or "[[PLATE" in t or "[[FRONTIS" in t or "[[CLOSING" in t
    }
    # Back matter is an alphabetical list set in two columns. A term at the
    # foot of a column is normal there, and several glossary terms are also
    # heading strings, so these matched and were reported wrongly.
    picture_pages |= {
        i + 1 for i, t in enumerate(raw)
        if re.search(r"\[\[REF-|Glossary|Index \(|Sources\b", t)
    }

    findings = []
    for pi, page in enumerate(pages, start=1):
        if pi in picture_pages:
            continue
        pw = float(page.get("width"))
        ph = float(page.get("height"))
        words = []
        for w in (page.findall(".//x:word", ns) if ns else page.findall(".//word")):
            words.append((float(w.get("xMin")), float(w.get("yMin")),
                          float(w.get("yMax")), (w.text or "")))
        if not words:
            continue

        top = ph * HEAD / SHEET_H
        bot = ph * (1 - FOOT / SHEET_H)
        band = bot - top
        recto = pi % 2 == 1
        left = (INNER if recto else OUTER) / SHEET_W * pw
        # The divider is the centre of the GUTTER, not the midpoint between
        # the two columns' left edges. The first version used the latter,
        # which falls inside column one and cut every column in half, so the
        # word counts below each heading were roughly halved and sound pages
        # were reported as stranded.
        mid = left + (COL_W + COL_GAP / 2) / SHEET_W * pw

        norm = [re.sub(r"[^\w]", "", t).lower() for _, _, _, t in words]
        for i in range(len(words) - 2):
            key = (norm[i], norm[i + 1], norm[i + 2])
            if key not in first_words:
                continue
            x, _, ymax, _ = words[i]
            depth = (ymax - top) / band
            if depth < FOOT_ZONE:
                continue
            same_col = [
                w for w in words
                if (w[0] < mid) == (x < mid) and w[1] > ymax + band * 0.004
            ]
            if len(same_col) < MIN_WORDS:
                findings.append((pi, round(depth * 100), len(same_col),
                                 first_words[key]))

    if "--json" in sys.argv:
        out = sys.argv[sys.argv.index("--json") + 1]
        json.dump({"stranded": sorted({t for _, _, _, t in findings})},
                  open(out, "w"), indent=1)
        print(f"{len(findings)} stranded headings -> {out}")
        return

    print(f"{len(pages)} pages, {len(findings)} stranded headings\n")
    for pg, depth, below, text in findings:
        print(f"  p{pg:3d}  at {depth:3d}% of the band, {below:2d} words under it   {text[:52]}")


if __name__ == "__main__":
    main()

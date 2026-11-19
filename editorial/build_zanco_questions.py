#!/usr/bin/env python3
"""Build the Diego Zanco (DeepBlue) question set for chapter 07, Connectivity, cyber risk and navigation.

Same layout as build_maltby_questions.py, whose setup and paragraph helpers it reuses.
"""

import sys
from pathlib import Path

from docx import Document
from docx.shared import Pt, RGBColor

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_maltby_questions import STONE, setup, para  # noqa: E402

OUT = ("/Users/jack/firstownersreference/editorial/contributor-docs/"
       "Diego Zanco - Chapter 07.docx")

TITLE = "Diego Zanco, DeepBlue"
META = (
    "Chapter 07, Operations, guest Q&A for the section on connectivity, cyber risk and navigation. "
    "Project Manager, DeepBlue (Deep Blue Soft Monaco SARL), yacht management software covering "
    "maintenance, crewing, inventory, finance, compliance and charter. Disclosure to be printed with "
    "the piece: DeepBlue sells management software, including finance and banking modules, and "
    "Foreland Marine is one of DeepBlue's retained implementation partners."
).replace("'", "’")

SECTIONS = [
    ("Chapter 07, Operations", [
        "Which records on board are the most sensitive, and where do they tend to live on a yacht "
        "that has no proper system: personal email accounts, spreadsheets, messaging groups?",

        "The chapter finds that most documented cyber losses on yachts are payments sent to a "
        "substituted bank account. What does a sound payment approval chain look like on a 40 to "
        "60 metre yacht: who raises a payment, who approves it, at what thresholds, and how should "
        "a change of supplier bank details be handled?",

        "Cloud or on board. What should an owner ask a software supplier about where the data is "
        "hosted, who can reach it, and what happens on board when the connection drops?",

        "Crew turnover is high. When a captain, purser or chief stewardess leaves, what has to "
        "happen to their access on the day they go, and how often is that done in practice?",

        "AI is arriving on board, both as assistants built in by the yard and as public tools the "
        "crew use on their phones. How is it changing the way management software is used, and "
        "where would you draw the line on owner, guest and crew data?",
    ]),
]

CLOSE = (
    "Five suggested questions, offered as a starting point. Please reshape any of them, and add "
    "an angle we have not asked. Answers of 100 to 200 words each work well. With thanks, Jack "
    "MacNally, on behalf of The First Owner’s Reference, November 2026."
)


def main():
    doc = Document()
    setup(doc)

    p = para(doc, 6)
    r = p.add_run(TITLE)
    r.bold = True
    r.font.size = Pt(14)
    r.font.name = "Georgia"

    p = para(doc, 12)
    r = p.add_run(META)
    r.italic = True
    r.font.size = Pt(10)
    r.font.color.rgb = RGBColor.from_string(STONE)

    n = 0
    for heading, questions in SECTIONS:
        p = para(doc, 6)
        p.paragraph_format.space_before = Pt(6)
        p.add_run(heading).bold = True
        for q in questions:
            n += 1
            p = para(doc, 10, hanging=True)
            p.add_run(f"{n}.  ").bold = True
            p.add_run(q)

    p = para(doc, 10)
    r = p.add_run(CLOSE)
    r.italic = True
    r.font.size = Pt(10)
    r.font.color.rgb = RGBColor.from_string(STONE)

    doc.save(OUT)
    print("wrote", OUT)


if __name__ == "__main__":
    main()

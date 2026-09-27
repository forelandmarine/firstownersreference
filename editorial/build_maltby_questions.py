#!/usr/bin/env python3
"""Build the Benjamin Maltby question set (chapter 06 lead, chapter 05 support) in TFOR contributor-doc format.

Matches the layout of the existing question docs (Hugo Morgan-Harris - Chapter 04.docx):
Letter page, 1in margins, Georgia 11pt Normal, bold 14pt title, italic 10pt stone metadata,
numbered questions with bold number and 0.3in hanging indent, italic stone closing note.
"""

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

STONE = "7A756D"
OUT = ("/Users/jack/firstownersreference/editorial/contributor-docs/"
       "Benjamin Maltby - Chapter 06.docx")

TITLE = "Benjamin Maltby, Keystone Law"
META = (
    "Chapter 06, Refit, lead guest Q&A, with three supporting questions for chapter 05, New build "
    "versus brokerage. Partner, Keystone Law; barrister, called in 2000, formerly at Ince & Co and "
    "MatrixLloyd; advises on superyacht construction, refit, purchase and sale, finance, and "
    "operational matters including tax, insurance and employment. Instructed on a fee basis by the "
    "party he acts for, which across the practice has included owners, finance providers, yards and "
    "suppliers; not paid contingent on any transaction closing."
)

SECTIONS = [
    ("Chapter 06, Refit", [
        "A refit contract governs work on an asset the owner already owns, carried out inside a yard "
        "the owner does not control. What makes it structurally different from a new build contract, "
        "and which clauses do you open first when the yard’s standard terms arrive?",

        "The chapter argues that “to superyacht standard” is a clause that has not been written, and "
        "that a specification should cite the manufacturer’s data sheet or the ISO standard instead. "
        "In a dispute, what does that citation actually give the owner, and how far can a contract go "
        "in making finish and workmanship measurable?",

        "Refit projects routinely run 30 to 50 percent over quoted scope, largely because the scope "
        "is priced on imperfect information before the vessel is opened up. How should the contract "
        "handle emergent work, variations and milestone payments so the overrun is contained rather "
        "than simply invoiced?",

        "Under the service-yard model at STP Palma or Lauderdale Marine Center, the owner contracts "
        "the trades directly through the project manager. Where does liability sit when one trade’s "
        "work interacts with another’s and something fails, and what should the owner’s set of "
        "contracts look like?",

        "During works the relevant cover is builder’s risk, taken out by the yard with the owner’s "
        "interest noted. What should the owner verify about that policy and the yard’s own liability "
        "terms before the yacht is hauled, and where does the gap between the two most often fall on "
        "the owner?",

        "Spanish Inward Processing Relief suspends 21 percent VAT on a refit for a non-EU flagged "
        "yacht. Which conditions most often trip an owner up, and what is the exposure if the "
        "procedure is not followed correctly?",

        "When a refit falls into dispute, the yacht is usually still in the yard. What rights does "
        "the yard have over the vessel, how is release against security normally arranged, and what "
        "should have been agreed at the outset so the owner is not finding out under pressure?",
    ]),
    ("Chapter 05, New build versus brokerage", [
        "The European yards that matter do not contract on SAJ or NEWBUILDCON. They contract on "
        "in-house templates drafted by their own counsel, with English law and London arbitration "
        "attached. When a first-time buyer’s team receives that first draft, where does the balance "
        "of risk sit, and which clauses do you open first?",

        "Refund guarantees are meant to secure the stage payments a buyer pays forward. Nobiskrug in "
        "2024 and Italian Sea Group in 2026 have shown what happens when a yard’s financial condition "
        "changes mid-build. In practice, how much protection does a refund guarantee give, what "
        "separates a reliable one from a weak one, and what should be agreed at heads of terms about "
        "a distressed-yard scenario before it arises?",

        "Title during construction. Some yards retain title until delivery; others pass it "
        "progressively as stages are paid. For an owner who has paid 60 percent of the contract price "
        "forward, what does each position mean if the yard fails, and what security would you want in "
        "place alongside it?",
    ]),
]

CLOSE = (
    "Ten suggested questions, seven for the refit chapter and three for new build, offered as a "
    "starting point. Please reshape any of them, and add an angle we have not asked. With thanks, "
    "Jack MacNally, on behalf of The First Owner’s Reference, September 2026."
)


def setup(doc):
    for s in doc.sections:
        s.page_width = Inches(8.5)
        s.page_height = Inches(11)
        for m in ("left_margin", "right_margin", "top_margin", "bottom_margin"):
            setattr(s, m, Inches(1))
    normal = doc.styles["Normal"]
    normal.font.name = "Georgia"
    normal.font.size = Pt(11)
    rpr = normal.element.get_or_add_rPr()
    rfonts = rpr.get_or_add_rFonts()
    for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
        rfonts.set(qn(attr), "Georgia")
    for tag in ("w:kern", "w14:ligatures"):
        for el in rpr.findall(qn(tag)):
            rpr.remove(el)
    ppr = normal.element.get_or_add_pPr()
    spacing = ppr.find(qn("w:spacing"))
    if spacing is None:
        spacing = OxmlElement("w:spacing")
        ppr.append(spacing)
    spacing.set(qn("w:after"), "200")
    spacing.set(qn("w:line"), "276")
    spacing.set(qn("w:lineRule"), "auto")


def para(doc, after_pt, hanging=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after_pt)
    if hanging:
        ppr = p._p.get_or_add_pPr()
        ind = OxmlElement("w:ind")
        ind.set(qn("w:left"), "432")
        ind.set(qn("w:hanging"), "432")
        ppr.append(ind)
    return p


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
        h = p.add_run(heading)
        h.bold = True
        for q in questions:
            n += 1
            p = para(doc, 10, hanging=True)
            num = p.add_run(f"{n}.  ")
            num.bold = True
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

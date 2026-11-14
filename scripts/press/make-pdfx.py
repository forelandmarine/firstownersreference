#!/usr/bin/env python3
"""Press block to PDF/X-4 for the printer.

  press-block.pdf (Chrome, RGB, live text)
    -> exact mount at trim + bleed, centred, TrimBox and BleedBox (PyMuPDF)
    -> CMYK on the paper profile, PDF/X-4 with output intent, images kept
       lossless (Flate) and capped at 600 ppi, text outlined (Ghostscript)
    -> text, rules and neutral greys in K only (blacktext.py)
    -> <out>-PDFX4.pdf

Outlining the text removes the Type 3 font subsets Chrome writes for
variable fonts, which some RIPs reject. Text checks therefore run on the
proof (live text), not on this file.

Chrome never prints to the exact millimetre (its page here is 214.12 x
286.09 mm for a 214 x 286 sheet), so the mount crops from the centre of
Chrome's page, not from its corner, or the whole excess lands on one edge.

Usage: python3 scripts/press/make-pdfx.py press-block.pdf out-prefix
Environment: TRIM_MM=208x280  BLEED_MM=3
             ICC=print/icc/PSOuncoated_v3_FOGRA52.icc  TITLE=...

Adapted from Littlpinguin/marketing-cockpit-template, 14-print/lib/build.sh
(MIT licence, see LICENSE-marketing-cockpit-template).
"""
import os
import subprocess
import sys
from pathlib import Path

import fitz

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent

if len(sys.argv) < 3:
    sys.exit(__doc__)
src, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
trim = tuple(float(v) for v in os.environ.get("TRIM_MM", "208x280").split("x"))
bleed = float(os.environ.get("BLEED_MM", "3"))
icc = Path(os.environ.get("ICC", ROOT / "print/icc/PSOuncoated_v3_FOGRA52.icc")).resolve()
title = os.environ.get("TITLE", "The First Owner's Reference, 1st Edition")

if not icc.exists():
    sys.exit(f"paper profile missing: {icc} (see print/icc/README.md)")

conditions = {
    "PSOuncoated_v3_FOGRA52": ("PSO Uncoated v3 (FOGRA52), ISO 12647-2:2013 PS5", "FOGRA52"),
    "PSOcoated_v3": ("PSO Coated v3 (FOGRA51), ISO 12647-2:2013 PS1", "FOGRA51"),
    "ISOcoated_v2_eci": ("ISO Coated v2 (ECI), ISO 12647-2:2004 FOGRA39L", "FOGRA39"),
}
cond, ident = next((v for k, v in conditions.items() if icc.stem.startswith(k)),
                   conditions["PSOuncoated_v3_FOGRA52"])

# 1. Exact mount. Chrome's paper is 214.12 x 286.09 mm but it paints only
#    the @page box (214 x 286), offset 0.08 mm up and left, so the bottom
#    0.17 mm of its sheet is never painted: a full-bleed page came out with
#    a white hairline at the foot that no CSS can reach (measured 14 November
#    2026). The mount therefore takes the painted area, less 0.1 mm at the
#    foot for safety, centred across, and scales it to the exact sheet. The
#    scale is about 1.0004: no visible change to type or position.
MM = 72 / 25.4
W, H = (trim[0] + 2 * bleed) * MM, (trim[1] + 2 * bleed) * MM
mounted = out.with_name(out.name + "-mounted.pdf")
s, d = fitz.open(src), fitz.open()
for page in s:
    p = d.new_page(width=W, height=H)
    painted_h = min(page.rect.height, H) - 0.18 * MM
    k = painted_h / H
    cw = W * k
    dx = (page.rect.width - cw) / 2
    p.show_pdf_page(fitz.Rect(0, 0, W, H), s, page.number,
                    clip=fitz.Rect(dx, 0, dx + cw, painted_h))
    p.set_trimbox(fitz.Rect(bleed * MM, bleed * MM, W - bleed * MM, H - bleed * MM))
    p.set_bleedbox(p.mediabox)
d.save(mounted)
print(f"mounted {d.page_count} pages at {W/MM:.2f} x {H/MM:.2f} mm, bleed {bleed:g} mm")

# 2. Ghostscript. Never -dPDFX=3 (it rasterises any page with transparency).
#    Leave -dMaxShadingBitmapSize at its default: raised, Ghostscript drops
#    objects silently (recorded upstream).
ps = out.with_name(out.name + "-pdfx4.ps")
ps.write_text(
    (HERE / "pdfx4.ps").read_text()
    .replace("@ICC@", str(icc)).replace("@TITLE@", title)
    .replace("@COND@", cond).replace("@INFO@", icc.name).replace("@ID@", ident)
)
x4 = out.with_name(out.name + "-x4.pdf")
subprocess.run([
    "gs", "-dBATCH", "-dNOPAUSE", "-q", "-sDEVICE=pdfwrite", "-dPDFX=4", "-dNoOutputFonts",
    "-sColorConversionStrategy=CMYK", "-dProcessColorModel=/DeviceCMYK",
    f"-sOutputICCProfile={icc}", f"--permit-file-read={icc.parent}/",
    "-dAutoFilterColorImages=false", "-dColorImageFilter=/FlateEncode",
    "-dAutoFilterGrayImages=false", "-dGrayImageFilter=/FlateEncode",
    # Re-encode embedded JPEGs losslessly in CMYK rather than pass them through.
    "-dPassThroughJPEGImages=false",
    "-dDownsampleColorImages=true", "-dColorImageResolution=600",
    "-dColorImageDownsampleThreshold=1.2", "-dColorImageDownsampleType=/Bicubic",
    "-dDownsampleGrayImages=true", "-dGrayImageResolution=600",
    "-dGrayImageDownsampleThreshold=1.2", "-dGrayImageDownsampleType=/Bicubic",
    "-o", str(x4), str(ps), str(mounted),
], check=True)

# 3. Text and neutral greys to K only.
final = out.with_name(out.name + "-PDFX4.pdf")
subprocess.run([sys.executable, "-I", str(HERE / "blacktext.py"), str(x4), str(final), str(icc)],
               check=True)
for f in (mounted, ps, x4):
    f.unlink(missing_ok=True)
print(f"written: {final} ({ident}, PDF/X-4)")

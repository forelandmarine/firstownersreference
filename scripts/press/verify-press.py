#!/usr/bin/env python3
"""Prepress check of the PDF/X-4 press file. Exits non-zero on any fault.

Usage: python3 scripts/press/verify-press.py print/1st-edition/<name>-PDFX4.pdf <pages>

Checks: page count; sheet size to 0.01 mm; blank pages; bleed covered; fonts
(Type 3 forbidden; with outlined text there are none); CMYK operators present
and no RGB left; PDF/X-4 output intent; TrimBox; effective resolution of every
image; JPEG re-encoding; maximum total ink.

Environment:
  TRIM_MM=208x280      finished size
  BLEED_MM=3           bleed in the delivered file
  DPI_MIN=300          minimum effective resolution
  DPI_STRICT=0         1 = low-resolution images fail the check. 0 (default
                       while the photographs are placeholders) = reported only
  TAC_MAX=300          maximum total ink, per cent (300 on FOGRA52)
  OUTPUT_ID=FOGRA52    expected output condition
  BLANK_ALLOWED=0      number of intentionally blank pages (opener spacers
                       and end padding); more than this fails

The blank-page check matters: Chrome can produce a PDF at the right size and
page count that is entirely blank when CSS has not loaded.

Adapted from Littlpinguin/marketing-cockpit-template, 14-print/lib/verify.py
(MIT licence, see LICENSE-marketing-cockpit-template). Checks unchanged
except blank-page allowance and the resolution switch; messages translated.
"""
import sys
import fitz

import os
import re
TOLERANCE_MM = 0.01
BLEED = float(os.environ.get("BLEED_MM", "3"))
FINI = tuple(float(v) for v in os.environ.get("TRIM_MM", "208x280").split("x"))
ATTENDU_MM = (FINI[0] + 2 * BLEED, FINI[1] + 2 * BLEED)
POLICES_AUTORISEES = [p.strip() for p in os.environ.get("FONTS_ALLOWED", "").split(",") if p.strip()]
TAC_MAX = float(os.environ.get("TAC_MAX", "300"))
DPI_MIN = float(os.environ.get("DPI_MIN", "300"))
DPI_STRICT = os.environ.get("DPI_STRICT", "0") == "1"
BLANK_ALLOWED = int(os.environ.get("BLANK_ALLOWED", "0"))
OUTPUT_ID = os.environ.get("OUTPUT_ID", "FOGRA52")
ECART_TYPE_MINI = 1.5


def ecart_type_pixels(page):
    """Grey variation of a page rendered at low resolution."""
    pix = page.get_pixmap(dpi=20, colorspace=fitz.csGRAY)
    valeurs = pix.samples
    n = len(valeurs)
    moyenne = sum(valeurs) / n
    variance = sum((v - moyenne) ** 2 for v in valeurs) / n
    return variance ** 0.5


def filet_non_couvert(page):
    """Look for an unprinted hairline at the edges of the bleed.

    White alone cannot be the test: blank pages ARE white.
    So the colour at the extreme edge is compared with a point 2 mm inside,
    still within the bleed and therefore within any background fill.
    Any break shows a strip the printer would leave white.
    """
    pix = page.get_pixmap(dpi=300)
    w, h = pix.width, pix.height
    marge = int(2 / 25.4 * 300)          # 2 mm en pixels
    controles = [
        ("head",      (w // 2, 0),        (w // 2, marge)),
        ("foot",      (w // 2, h - 1),    (w // 2, h - 1 - marge)),
        ("left edge", (0, h // 2), (marge, h // 2)),
        ("right edge", (w - 1, h // 2), (w - 1 - marge, h // 2)),
    ]
    defauts = []
    for nom, bord, interieur in controles:
        cb = pix.pixel(*bord)[:3]
        ci = pix.pixel(*interieur)[:3]
        # An unprinted hairline is PURE WHITE. A bled picture varies slightly
        # from point to point without ever being white, so it is not flagged.
        # Flag a white edge, or a sharp jump (> 25 levels) between edge and
        # inside, which shows a fill stopping short.
        blanc = all(c >= 250 for c in cb)
        ecart = max(abs(a - b) for a, b in zip(cb, ci))
        # Only a WHITE edge on a non-white ground shows an unprinted hairline.
        # A bled picture may be dark at the edge and light 2 mm in:
        # that is drawing, not a fault.
        if blanc and ecart > 4:
            defauts.append(f"{nom}: white edge {cb} on ground {ci}")
    return defauts


def controle(chemin, pages_attendues):
    doc = fitz.open(chemin)
    erreurs = []

    if doc.page_count != pages_attendues:
        erreurs.append(f"{doc.page_count} pages, expected {pages_attendues}")

    vides = []
    for page in doc:
        larg = page.rect.width / 72 * 25.4
        haut = page.rect.height / 72 * 25.4
        if (abs(larg - ATTENDU_MM[0]) > TOLERANCE_MM
                or abs(haut - ATTENDU_MM[1]) > TOLERANCE_MM):
            erreurs.append(f"page {page.number + 1}: {larg:.3f} x {haut:.3f} mm")
        if ecart_type_pixels(page) < ECART_TYPE_MINI:
            vides.append(page.number + 1)
        filets = filet_non_couvert(page)
        if filets:
            erreurs.append(
                f"page {page.number + 1}: bleed not covered at "
                + ", ".join(filets))

    if len(vides) > BLANK_ALLOWED:
        erreurs.append(f"{len(vides)} blank pages, {BLANK_ALLOWED} allowed: {vides}")

    polices = {f[3] for page in doc for f in page.get_fonts()}
    type3 = {f[2] for page in doc for f in page.get_fonts()} & {"Type3"}
    if type3:
        erreurs.append("Type 3 fonts present: the text was not outlined")
    elif polices and POLICES_AUTORISEES:
        hors_liste = [p for p in polices if not any(a in p for a in POLICES_AUTORISEES)]
        if hors_liste:
            erreurs.append(f"font not allowed: {hors_liste}")

    brut = open(chemin, "rb").read()
    # CMYK is detected by the colour operators in the streams (k / K), not by
    # the string DeviceCMYK: Ghostscript omits it when everything is already
    # four-colour, which gave a false negative.
    ops_k = 0
    for page in doc:
        for xref in page.get_contents():
            try:
                ops_k += len(re.findall(rb"[\d.]+ [\d.]+ [\d.]+ [\d.]+ [kK]\b",
                                        doc.xref_stream(xref)))
            except Exception:
                pass
    if ops_k == 0:
        erreurs.append("no CMYK colour operators: conversion not applied")
    # RGB left: look at objects and images, not raw bytes. The upstream test
    # searched the file for "/RGB" and matched it by chance inside
    # compressed image data (found 14 November 2026).
    rgb = []
    for xref in range(1, doc.xref_length()):
        try:
            obj = doc.xref_object(xref, compressed=False)
        except Exception:
            continue
        if "/DeviceRGB" in obj or "/CalRGB" in obj:
            rgb.append(xref)
    for page in doc:
        for im in page.get_images(full=True):
            if im[5] in ("DeviceRGB", "CalRGB") or (im[5] == "ICCBased" and fitz.Pixmap(doc, im[0]).n - fitz.Pixmap(doc, im[0]).alpha == 3):
                rgb.append(im[0])
    if rgb:
        erreurs.append(f"RGB colour space left in {len(set(rgb))} object(s)")

    # Prepress: PDF/X output intent, TrimBox, lossless images, total ink.
    if b"/OutputIntents" not in brut or OUTPUT_ID.encode() not in brut:
        erreurs.append(f"no PDF/X-4 output intent {OUTPUT_ID}")
    if b"/GTS_PDFXVersion" not in brut:
        erreurs.append("no PDF/X marker")
    for page in doc:
        tb = page.trimbox
        if abs(tb.width / 72 * 25.4 - FINI[0]) > 0.05 or abs(tb.height / 72 * 25.4 - FINI[1]) > 0.05:
            erreurs.append(f"page {page.number + 1}: TrimBox {tb.width/72*25.4:.1f} x {tb.height/72*25.4:.1f} mm, expected {FINI[0]:g} x {FINI[1]:g}")
            break
    # Effective resolution of every image in the final PDF. Needed here as well
    # as on the proof: Ghostscript rasterises gradients during conversion, so
    # vector input can become low-resolution images in the output.
    basse_def = []
    for page in doc:
        for im in page.get_images(full=True):
            try:
                info = doc.extract_image(im[0])
            except Exception:
                continue
            for r in page.get_image_rects(im[0]):
                if r.width <= 1:
                    continue
                dpi = info["width"] / (r.width / 72)
                if dpi < DPI_MIN - 5:
                    basse_def.append(f"p{page.number + 1} {info['width']}x{info['height']} at {dpi:.0f} ppi")
    if basse_def:
        msg = f"{len(basse_def)} image(s) under {DPI_MIN:g} ppi: " + "; ".join(basse_def[:6])
        if DPI_STRICT:
            erreurs.append(msg)
        else:
            print("  note:", msg)

    jpeg = 0
    for xref in range(1, doc.xref_length()):
        try:
            obj = doc.xref_object(xref, compressed=False)
        except Exception:
            continue
        if "/Subtype /Image" in obj or "/Subtype/Image" in obj:
            if "DCTDecode" in obj: jpeg += 1
    if jpeg:
        erreurs.append(f"{jpeg} image(s) re-encoded as JPEG (DCTDecode): quality loss")
    # Total ink: CMYK render at 150 dpi, max C+M+Y+K per page.
    pire = (0, 0)
    for page in doc:
        pix = page.get_pixmap(dpi=150, colorspace=fitz.csCMYK)
        import array
        buf = pix.samples
        n = pix.width * pix.height
        # sum of the 4 channels per pixel, per cent (0..400)
        mx = 0
        step = 4
        # sampling: one pixel in three is enough for the maximum
        for i in range(0, len(buf) - 3, step * 3):
            v = buf[i] + buf[i+1] + buf[i+2] + buf[i+3]
            if v > mx: mx = v
        tac = mx / 255 * 100
        if tac > pire[1]: pire = (page.number + 1, tac)
    # The render above resamples images and reads one pixel in three, so a
    # hairline of one or two pixels is averaged away (measured upstream: 295%
    # reported against 323% real in icon outlines). Each CMYK image is also
    # read at its native resolution.
    import numpy as np
    for page in doc:
        for im in page.get_images(full=True):
            try:
                pix = fitz.Pixmap(doc, im[0])
            except Exception:
                continue
            if pix.n - pix.alpha != 4:
                continue
            px = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
            mx = 0
            for y in range(0, pix.height, 512):                 # in bands: bounded memory
                mx = max(mx, int(px[y:y + 512, :, :4].sum(axis=2, dtype=np.uint16).max()))
            tac = mx / 255 * 100
            if tac > pire[1]: pire = (page.number + 1, tac)
    if pire[1] > TAC_MAX + 2:
        erreurs.append(f"total ink {pire[1]:.0f}% on page {pire[0]} (max {TAC_MAX:.0f}%)")

    if erreurs:
        print(f"FAIL {chemin}")
        for e in erreurs:
            print("  -", e)
        return False

    etat = "text outlined" if not polices else f"fonts {sorted(polices)}"
    print(f"OK {chemin}: {doc.page_count} pages, {len(vides)} blank, "
          f"{ATTENDU_MM[0]:g} x {ATTENDU_MM[1]:g} mm, CMYK {OUTPUT_ID} PDF/X-4, TrimBox {FINI[0]:g} x {FINI[1]:g}, "
          f"TAC max {pire[1]:.0f} % (p{pire[0]}), {etat}")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    sys.exit(0 if controle(sys.argv[1], int(sys.argv[2])) else 1)

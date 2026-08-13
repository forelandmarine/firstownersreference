# Print artefacts

Output of `node scripts/build-print.mjs`. Everything here is generated; nothing in this folder is edited by hand.

## 1st-edition

The proof set as built on 8 August 2026, 120 pages at 230 × 300 mm trim.

| File | What it is |
|---|---|
| `firstownersreference-1st-edition-proof.pdf` | RGB reading proof, full bleed, TrimBox and BleedBox stamped |
| `firstownersreference-1st-edition-proof-CMYK.pdf` | Same proof converted to CMYK via Ghostscript, generic prepress profile |
| `firstownersreference-1st-edition-proof-press-block.pdf` | Cover dropped, padded to a multiple of eight pages |
| `firstownersreference-1st-edition-proof-press-block-CMYK.pdf` | CMYK master for the printer |
| `firstownersreference-1st-edition-case.pdf` | Flat case artwork for the binder, printed from `/print-case` |

The PDFs are gitignored. A duplicate set sits in iCloud at Foreland Group / Marketing Materials as the off-machine backup.

## notes

Design notes, the editorial todo list, and the image assignment manifest, all regenerated on each build. Read them alongside the proof.

## Rebuilding

    node scripts/build-print.mjs          # SKIP_BUILD=1 to reuse .next

Requires puppeteer, sips, pdftotext (poppler), gs (ghostscript), python3 with pypdf. Output lands back in this folder, overwriting the previous build.

# Paper colour profiles

The press build (`scripts/press/make-pdfx.py`) converts the book to CMYK on the paper's ICC profile and declares it as the PDF/X-4 output intent. The `.icc` files are not committed: ECI profiles "may be used, embedded and exchanged without restriction" but "may not be distributed, sold or altered" (the profile's own copyright text). Download once per machine.

| Stock | Profile | File name expected here |
|---|---|---|
| Uncoated (Munken Pure, the planned text stock) | PSO Uncoated v3 (FOGRA52) | `PSOuncoated_v3_FOGRA52.icc` |
| Coated | PSO Coated v3 (FOGRA51) | `PSOcoated_v3.icc` |
| Coated, printer still on FOGRA39 | ISO Coated v2 (ECI) | `ISOcoated_v2_eci.icc` |

FOGRA52 downloads directly from the ICC registry:

```
curl -sL -o print/icc/PSOuncoated_v3_FOGRA52.icc \
  https://registry.color.org/profile-registry/profiles/PSOuncoated_v3_FOGRA52.icc
```

The profile is chosen with the printer, not from memory. If the printer specifies another, set `ICC=` for `make-pdfx.py` and `OUTPUT_ID=` and `TAC_MAX=` for `verify-press.py` (330 per cent on FOGRA39, 300 on FOGRA51 and FOGRA52).

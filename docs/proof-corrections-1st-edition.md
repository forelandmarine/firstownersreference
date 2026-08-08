# 1st edition proof corrections

Instructions for the build agent. Source: full editorial markup of `firstownersreference-1st-edition-proof.pdf` (121 pages, reviewed 8 Aug 2026, six page-by-page passes covering the whole block).

## Build-agent status, 8 Aug 2026 evening

Completed and rebuilt (120pp block, artifacts refreshed):
A1/A2 remain open (need the true figures from the project file).
A3 done (folio 87 quote reattributed to Erica Lay; full dedup still F1).
A4 open (Ella Johnson contributor status needs Jack's confirmation).
A5 done (colophon PI restated as ITIC GBP 500k standing cover, web and print).
A6 done ("page 128" removed; now "on the final page").
A7 improved (leading-article alphabetisation, sentence entries excluded,
real folio locators from the page map); commission-or-cut decision open.
A8 done (SVG overflow un-clipped; re-render verified). A9 done (axis to
900 with round ticks). A10 done ("80 to 99 m", no-60-70-band note).
A11 done ("who was" inserted). A12 keeps strengthened; re-check on next
read. A13/A14 done (A14 was an extraction artifact; source was clean).
A15 done for ch02 (La Ciotat), ch05 (Makkum yard), ch06 (Hamburg);
remaining coordinate lines still need eyeball verification vs photos.
A16 done (question reworded; no longer implies Hill Robinson drafting).
B: all six items remain with counsel/editor.
C: done: folio 10 eight-figure fix, folio 64/67 sixfold overrun, EU ETS
phasing clarified in essay (spread was already right), NTS clause cut
pending Davis confirmation, Kaos/coup sentence split and dated, P&I
unified to USD, 8-to-20 range unified, matrícula accent, terraforming
now land reclamation. Everything else in C remains open.
D1 done (448 apostrophes + 21 double-quote pairs converted; zero
straight quotes remain in content libs). D2 done. D3 done (marks bound,
cannot strand). D7 partial (boilerplate unified to "lightly edited for
length and clarity"; other style decisions open). D8 done (reading
times computed from actual word counts). D9 done (01.02/01.03, 03.01/
03.02 renumbered to book order). D4/D5/D6/D10 open.
Diacritics: Lürssen ×18 and García-Aubert restored.
E, F, G (beyond A8-A10), H: open, with E1 (credits page) and the E6
aesthetic decision needing Jack first.

## Build-agent status, second pass (8 Aug, evening)

Verification round using primary sources:
- "Stefan Zimmermann Zschocke, CEO of Oyster Yachts": the review flag was
  WRONG; he is Oyster's CEO from 1 Sep 2025 (BOAT International,
  Oyster's own announcement). No change; treat as verified.
- 111m DreAMBoat delivered November 2025: also verified correct
  (Oceanco Y726, second DreAMBoat for the same owner). The review
  confused it with the 2019 90m DreAMboat. No change.
- CIT/IEEPA: essay corrected (CIT ruled May 2025; Supreme Court upheld
  after November 2025 argument; refunds ordered spring 2026).
- Burgess/Ancient stake unified to November 2025 (Megayacht News).
- Wave Expandary / Lai Sun figures spot-verified (EUR 50m EV,
  EUR 9.135m put/call both confirmed against coverage).
- Palm Beach show datelines corrected April to March 2026.
- "CEO Manuel Di Tillio" claim does not exist in the book; he appears
  correctly as a roundtable participant (he is Amico technical and
  sales director). No change needed.
- YORP launch corrected July to June 2023.
- Red Ensign list: Pitcairn removed, Cayman added.
- Wolfson Marine and Winterbothams removed from all surveyor lists
  (research unit and unverifiable name respectively).
- Retrocession basis annotated (commission-share vs premium-share).
- ch01 case: USD/EUR 8.5m unified to EUR with consistent period.
- ch03 case: standfirst fee saving corrected to GBP 75,000 (the body
  arithmetic supports it).
- "Composite of one" metas corrected to "Single Foreland project".
- Glossary brokerage commission qualified (IYBA flat vs MYBA scale).
- YPI/Quay YoY wording repaired.
- Capgemini 2024 (ch08 sustainability) vs 2025 (ch09 wealth transfer)
  appear to be deliberate different editions; left, confirm with editors.

PRODUCTION HAZARD discovered and documented in print.css: the sources
section sits on a Chrome print-layout tipping point. Three separate
perturbations (an invalid url string, word-break rules, a display-
shortening change) each reflowed the book from 120pp to 217pp at ~68%
width. Sources content and rendering are FROZEN pending a proper fix;
the folio-117 long-URL truncation is accepted as a known cosmetic
defect for now. The build script now also refuses to print from a
build whose font download failed (the other silent 217pp cause).


Numbering: printed folio runs one behind the PDF page (PDF p41 carries folio 40). All references below are printed folios unless marked "PDF p" (front matter pages before folio 1 are unfoliated).

Work the sections in order. Sections A and B are blockers, nothing ships until they are clear.

## A. Blockers

1. Folio 34 vs 35: the case study states the fee saving as "approximately GBP 25,000" in the standfirst and "approximately GBP 75,000" in the body. Same case, facing pages, threefold discrepancy. Establish the correct figure from the project file and fix both.
2. Folio 13: the same figure appears as "EUR 8.5 m" (total cost of first 18 months) and "USD 8.5 m" (overpayment over two years). Two currencies and two timeframes for one case. Reconcile currency and period.
3. Folio 87: the pull quote "Do not just hire the best captain on paper..." is credited "CHAPTER 07, LEAD ESSAY" but is Erica Lay's verbatim answer from folio 80. Correct the attribution or remove the quote.
4. Folio 100 area (chapter-close): "CAPT. ELLA JOHNSON, SAILING YACHT CAPTAIN, MAY 2026" carries a named, dated attribution. Colophon acknowledgements name only Erica Lay as confirmed guest opinion. Confirm Ella Johnson is a real, signed contributor. If placeholder or composite, the attribution cannot print.
5. Colophon: "Foreland holds professional indemnity at GBP 5 million per claim, written through a Lloyd's syndicate." Standing cover is ITIC PI at GBP 500k; the GBP 5m ZIS placement was project-specific to the FHC 26/08 bid. Rewrite to state the actual standing cover, or remove the figure.
6. Colophon: "hand numbered and signed by the editors in chief on page 128". The block is 121 pages. Reconcile the page count or the sentence.
7. Index (folios 114-115): labelled "Index (working)", auto-generated, unusable. Duplicate case-variant entries, ~40 entries alphabetised under "The", whole sentences as entries, chapter-number locators instead of page numbers. Decision needed: commission a real index with page locators, or cut the index entirely and let glossary + sources carry the back matter. Do not print it as is.
8. Figures 08.01 and 08.02 (folios 96-97): clipped at the right margin. Totals cut to "EUR 3.7 m to", legend cut to "Bert", GT labels cut to "2000 to 2800 G". The chart generator is not respecting the text measure. Fix widths and re-render every figure in the book.
9. Folio 21, Figure 02.03: March 2026 value is EUR 817.4m but the y-axis tops out at 800, so the largest month's bar is silently clipped. Extend the axis and re-render.
10. Folio 83, Figure 07.01: size bands are broken. 50-60m jumps to 70-79m (no 60-70 band), then "80m and above" overlaps "100-119m". Rebuild the banding.
11. Folio 78: broken syntax in the sexual-assault paragraph ("a crewmember sexually assaulted in English Harbour... had the vessel arrested"). Missing "was", garbled construction. This paragraph above all others must be clean. Rewrite carefully.
12. Folio 58 (and 88, 93, 110): stranded subheads. "The pattern, repeated" is the last line of folio 58 with zero text under it. Enforce keep-with-next globally, then check every subhead.
13. Missing word, folio 104: "The single most important is to engage an adviser..." Insert "decision".
14. Folio 49: missing space, "on that point.The alarm bell should ring".
15. Chapter 02 opener (PDF p17): coordinates read 50.7601N 1.2982W (Portsmouth) under a photograph of La Ciotat. Looks like a paste from the Tipner files. Fix, then verify every coordinates line in the book against its actual photograph (folio 62 has the same fault: Hamburg dock, Barcelona coordinates; chapter 05 opener coordinates resolve to Dutch farmland).
16. Folio 55: Q2 header reads "The 33-page Hill Robinson contract example for a 77 metre yacht", implying Hill Robinson produced it. Per folio 50, Laverty of Hill Robinson cited it. Reword before Hill Robinson reads it.

## B. Legal review (put in front of counsel before press)

1. Folio 52: the Cecil Wright dual-role passage (Spear's ranking, Project Solent, "Cecil Wright is a broker"). Facts may hold; the framing needs a defamation read.
2. Folio 26 caption: commentary "attributed to Cromwell Littlejohn (Northrop & Johnson) at industry events". Naming an individual at a named firm on unspecified hearsay. Get a citable source or cut the name.
3. Folio 92: "Tom Cruise commissioned a Swan 108 in February 2025... estimated above USD 30 million." Unsourced celebrity purchase claim, and it collides with the live Foreland Swan 108 engagement (FMC-SW108-MGT-001), so it reads as inside information laundered into editorial. Cut it unless there is a citable public source, and even then consider the conflict optics.
4. Folio 50: caption asserts a named private yacht's contract terms "settled at heads of terms". Unverifiable claim about a specific vessel. Soften or source.
5. Folio 76: "Adix, deck crew" caption names a real yacht and identifiable crew. Confirm permission or crop/recaption.
6. Folio 22: Edmiston table row reprints the broker's own superlatives uncaveated. Rewrite neutrally or attribute as their claim.

## C. Fact-check list (verify or cut, grouped by page)

Front and ch01-02:
- PDF p8 contributors: footnote says "Eight chapter contributors are still being confirmed" but the grid shows three TBC slots. Reconcile.
- PDF p8: Hein Velema credited "Secretary General, Superyacht Alliance for Professional Standards; first president of SYBAss". Verify every word of this line with Velema directly. Same title recurs at folio 35.
- Folio 10: "USD 12 to 15 million in value... another USD 15 to 22 million in opex. A nine-figure hold cost." That sums to USD 27-37m, eight figures. Fix.
- Folio 11: intro note "working range is 8 to 20 percent" vs figure subtitle "8 to 22 percent". Reconcile. Figure 01.02 does not exist (jumps 01.01 to 01.03); renumber.
- Folio 18: "111m DreAMBoat" (delivered 90m, 2019); verify vessel, length, claim. "119m Feadship Breakthrough sale" and Denison days-on-market series against source.
- Folio 19: "In November 2025 the US Court of International Trade ruled". CIT ruling was May 2025; November was the Supreme Court stage. Check. Verify tariff table figures and "SW108 Kalantis".
- Folio 27: Wave Expandary / Sea Expandary / Lai Sun figures (EUR 50m EV, HK$270.7m revenue, put/call EUR 9.135m, long stop 30 Sep 2026): re-verify every number against the filing and add a source line on the page.
- Folio 27 vs 32: Ancient's Burgess stake dated November 2025 on one page, October 2025 on the other. Fix one.
- Folio 32: insurance retrocession "EUR 12,500 to 25,000 (per year)" vs folio 34 case computing the same referral at EUR 3,750. Order of magnitude apart. Reconcile or annotate the basis.
- Contributor credits on the ch03 and ch04 openers appear shifted by one chapter (Roch credited on ch03 which contains the Filippakis interview; Filippakis credited on ch04). Verify against contributor agreements.

Ch04-05:
- Folio 42: Malta leasing effective VAT 5.4-6.12 percent describes pre-2019 guidelines. Verify against current Maltese guidance.
- Folio 43: Pitcairn listed as Red Ensign Group member (doubtful); Cayman appears twice. Surveyor list "Wolfson Marine... Winterbothams" (folios 43 and 38): Wolfson Unit is a research outfit, not a survey house. Verify all four names and their consent to be listed.
- Folio 46: Will Christie quote dated "Palm Beach, April 2026"; the show runs in March. Check.
- Folios 40-48: verify Phi ECHR status claim, Winch Design v Le Souef citation [2025] EWHC 120 (Comm) and GBP 733,750, Italian Sea Group April 2026 Court of Florence order, YORP founding details ("July 2023, founding member Benetti, 200 hours").
- Folio 57: "Hannaford Turner partner Justin Turner" appears only here. Verify person and firm.
- Folio 58: case metadata says contract EUR 95m, final EUR 108m, body accounts for EUR 2.6m of change orders. Reconcile the remaining ~EUR 10m or soften the metadata.
- Folio 44 vs 45: "Composite of one Foreland project" is a contradiction; disclosure says "Single Foreland Marine project". Use the single-project wording. Same fault at folio 87.

Ch06-07:
- Folio 64: "600 percent overrun (USD 1 million budget, USD 6 million actual)". That is 500 percent. Also wrong in the folio 67 table. Fix both.
- Folios 64-65: "CEO Manuel Di Tillio" of Amico & Co, verify name and title (twice). "Squircle Capital reached 100% ownership March 2026", confirm. "Olesinski's Real-Time Refit Process (ORTR), 2026 YARE innovation award" smells constructed; verify or cut.
- Folio 75: YPI Crew 2026 salary guide "7 percent year-on-year against the 2023 survey" does not parse. Check survey years.
- Folio 82: "as seen with the NTS losses". NTS never expanded anywhere. Expand or cut.
- Folio 82: garbled sentence fusing MY Kaos Barcelona vandalism with "the failed Turkish coup in 2016". Kaos incident was 2023. Split, date, and source both examples or cut.
- Folio 83 vs 81-82: P&I limit "EUR 500m" in the table vs "USD 500 million" in Davis's quotes. One currency.
- Folio 84: broker row "Norton & Co, J&H Marsh, AXA Marine, YachtSure, Northstar". J&H Marsh died as a name in 1997; YachtSure and Northstar unplaceable. Verify every name or cut the row.
- Folio 85: "EUR 444 k loss" precision sourced to "BOAT International published case studies". Verify or round.

Ch08-09 and back:
- Folio 91: Aquarius II stated 65m (generally reported ~60m); AERA concept attributions; verify.
- Folios 91 and 97: EU ETS phasing stated as "40 percent of 2024 emissions in 2025, 70 in 2026, 100 from 2027". Regulation is 40 percent of 2024 emissions, 70 percent of 2025, 100 percent of 2026 onward. Systemic error, fix in body and figure caption.
- Folio 92: "Stefan Zimmermann Zschocke, CEO of Oyster Yachts" is almost certainly wrong. Verify the actual CEO name. Also: J Class hull "reported in build at Brodotrogir" (reported by whom?), "83m Feadship Project Solent" attributed to Malcolm McKeon, "Will Bishop of Superyacht Partners".
- Folio 79: "matricula turística" missing accent (matrícula); "a state-backed terraforming exercise" should be land reclamation; Monaco "90 days of commercial charter" and Knight Frank "Wealth without borders" subtitle need verification.
- Folio 66 and 77: Bayesian material (sinking, USD 150m insured loss, identical van der Merwe quote) duplicated wholesale across chapters. Keep one, cut or cross-reference the other.
- Glossary: "Brokerage... typically 10 percent of the sale price" sits against the MYBA sliding scale the book itself cites in ch03 sources. Qualify.
- Folio 117: IMO MSC.337(91) URL truncated mid-string. Complete it. Capgemini cited as 2024 in ch08 and 2025 in ch09; verify both editions are meant. Unify Quay Crew citation styling between folios 116 and 117.
- Folio 113: URL "superyachtalliance.org/register/register-table/" looks like a path stutter. Verify the live URL.

## D. Global pipeline fixes (one fix each, applied everywhere)

1. Quotes and apostrophes: body text uses straight apostrophes and straight double quotes throughout; display type uses curly. Global smart-quote pass over the entire block.
2. Running heads: no space after the middot on every verso and recto ("CH 02 ·READING THE MARKET"). Fix the template once. Decide one middot spacing convention for kickers too (currently spaced in kickers, unspaced in running heads).
3. Stray orphaned glyphs: a small square bullet/dot renders alone at the left margin under centred pull quotes (folios 14, 23, 34, 45, 60, 71, 99, 111 and others), and disclosure lines end with a floating "·". Find the component, fix it once, sweep the book.
4. End-of-chapter template collapse: every chapter end shows body text stopping 30-40 percent down, a floating centred pull quote, then dead paper (worst: folios 41, 45, 60, 71, 99). Rework the template so chapter ends either fill or close deliberately.
5. Half-empty pages: roughly fifteen body pages end 40-70 percent blank (folios 12, 14, 23, 29, 31, 34, 43, 56, 57, 69, 85, 93, 94, 97, 108, 109, 111 area). This is a signature-level pagination problem. One full pagination pass.
6. H&J: justified narrow columns with loose lines and rivers (worst folios 9, 17, 18, 38, 63, 70, 75). Tighten hyphenation and word-spacing settings or go ragged right. Also stop hyphenating -ly adverbs ("separately-granted", folio 40) and proper nouns ("Fead-ship", folio 65).
7. Style decisions, one each, then applied globally: metre style ("50 m" vs "50m"); chapter numbers ("chapter nine" vs "chapter 9"); percent style ("percent" vs "%", folio 68 uses "%"); serial comma (folio 88 at-a-glance is internally inconsistent); pull-quote terminal full stops (folio 40 has one with, one without); pull-quote rule (ruled on some pages, unruled on others, folios 64 vs 76-77); case-study headline terminal periods; "M/Y" vs "MY" vessel prefixes; interview boilerplate (three variants of "answers are given on the record, lightly edited for typography" exist, and "edited for typography" is itself wrong, use "lightly edited for length and clarity"); diacritics (Lürssen loses its umlaut at least eight times while Bläsing, Monégasque, Döhle keep theirs; García-Aubert missing accent twice).
8. Reading time on openers: both ch01 and ch02 say exactly "6 MIN READ". Compute real values or drop the device. "13 min read" (ch05) confirms it exists elsewhere; verify all.
9. Figure numbering: 01.02 missing, 03.02 appears before 03.01. Renumber the whole book.
10. Blank pages: PDF p37 is a blank recto facing a chapter closer; folio 73 carries a footer rule but no content. Decide the imposition rule (chapter openers on recto is the norm; both ch02 and ch03 openers currently fall verso) and apply it consistently.

## E. Photography programme (single decision, then execute)

The photography is the weakest element in the book and the only place it behaves like the trade press it critiques. Current state: uncredited throughout, mostly uncaptioned, and repeatedly subject-mismatched (dinghy-race dock on a private-equity page, folio 27; man furling a 40ft classic on the brokerage opener, PDF p26; trailered dinghies on a EUR 6.4m refit case, folio 70; varnished runabout on a 62m case, folio 58; phone snap of palletised machinery with wheelie bins, folio 49; four near-identical hazy sailboat stocks in chapter 09; a keelboat fleet as the final page of the book).

Required:
1. Image credits page in this edition, not deferred to the press edition. This is a rights issue.
2. Caption policy: every editorial image captioned or deliberately bare, one rule.
3. Folio 98: the case-study photo is recognisably Maltese Falcon illustrating an anonymised case. Readers will assume it is the case vessel. Add "not the vessels described" or replace.
4. Folio 48: the Somnio / Winch Design v Le Souef account, the chapter's most substantive legal material, is set as a 15-line caption under an unrelated marina photo. Promote to body text.
5. Contributor portraits: three registers (corporate headshot, outdoor snapshot, holiday photo with sunglasses). Unify treatment or run all as uniform b/w.
6. Either commit to the classic-sailing aesthetic as a stated visual identity (a line in the colophon would do it) or replace the mismatched images. Do not leave it ambiguous.
7. Cover: confirm rights on the identifiable vessel, and confirm you want a recognisable yacht on the cover of an independence-positioned title.

## F. Editorial passes

1. Quote deduplication. Nearly every pull quote appears two or three times (essay assertion + display quote + verbatim interview answer). Chapter 05 is worst: eight quotes triple up (folios 39=41, 51=54, 51=55, 49=55, 50=58, 49=54, 52=57, 40=45). Also folio 90 runs Ella Johnson's answer unattributed four pages before her interview; folio 103 runs Roberts's answers as essay pull quotes three pages early; Velema's folio 28 quote is reused as the folio 35 standfirst. Rule: each quote appears once. Where a forward quote from an interview is wanted, attribute it as such.
2. Self-citation. Pull quotes attributed "CHAPTER NN, LEAD ESSAY" appear at folios 23, 34, 45, 71. The book quoting itself is a tic. Maximum one per edition, preferably zero.
3. Rhythm pass. The house cadence is audible: the antithesis template ("X is not Y. It is Z.") appears in every voice including all interviewees; the two-beat epigram closer ends nearly every unit ("That is the argument. The rest is detail."); triads recur; "honest/honestly" is a crutch (the index exposes three entries built on it); "architecture" does four jobs in four pages in ch09; "said plainly" appears three times; "use case" (folios 39, 53) and "prosecuted to closure" (folio 71) are out of register. One editor, one pass, vary the closers, and leave the interviews' human lumpiness in. Filippakis's slightly imperfect English is the most credible material in the book; do not polish it.
4. Interview bench. Filippakis appears three times in ten pages (folios 80, 89 quote, 95). Velema and Inglis relitigate the same ground in ch05. Either recruit wider for the press edition or cut one appearance each.
5. Interview edits. Folio 54: "We did not delete all the inflated CVs" does not answer the question asked; query with Velema. Folio 94: Ella Johnson's chirpy closer ("you'll love every minute of it") is off-register; "sea legs take a couple of days to get used to" is a mangled idiom. Folio 107: the Roberts interview never answers whether Quadrant passes the six-element independence test while the publisher applies it to itself on the colophon; that is a visible flinch, either get the answer or note the decline.
6. Independence claim frequency: stated on PDF p4, p5, p6 (twice), folio 10 and folio 15. Six statements in thirteen pages. Keep the editors' letter statement and the colophon; cut the rest.
7. "From the editors" farewell (folio 105) lands before the interview, data spread, case study and eight pages of back matter. Move it to close the editorial body. Signature "Dan & Jack" vs colophon "Jack MacNally and Daniel Marks": decide deliberately.
8. Duplicated passages: SYBAss founding history told twice (folios 49 and 54); folio 57 restates folio 50's ten contract points and folio 52's fee table item for item; folio 31 standfirst and callout open with the same sentence; folio 87 repeats "The arithmetic... is not subtle" twice on one page. Cut the restatements.
9. Grammar and sense repairs beyond the blockers: folio 65 "...and a project manager who has handled comparable scope, is." (rewrite); folio 33 "carried a referral economics" (drop "a"); folio 32 "a EUR 850,000 spread between which scale the brokers apply" (rewrite); folio 102 triple "among" sentence; "It is a depreciating asset whose depreciation..." (folio 10); "available to be bought" (folio 24 standfirst); folio 34 headline takes the top of the body's own range, use the conservative figure or "up to"; folio 56 title promises "year by year" over milestone-shaped tables, retitle; folio 112 "approximately" six times on one page, thin it.
10. "At a glance" lists sit at chapter ends under a preview-style label. Retitle as a recap or move. Also folio 61: item "SYBAss founded YORP because the gap was structural" is an argumentative sentence in a list of noun phrases and overshoots the measure; recast as a noun phrase.
11. Data sourcing: "practitioner working knowledge" appears three times as a source on folios 67-68. Once is honest, three times reads as "trust us". Vary or consolidate.
12. CASE PROVENANCE / HOW TO READ / CORRESPONDENCE boilerplate repeats verbatim on every closer. Consider running it in full once (front matter or first closer) and short-form thereafter.

## G. Charts (beyond the blocker re-renders)

1. Folio 20, Figure 02.02: full-width bar chart for 1,138 vs 1,093. Replace with a stat pair. Axis increments 0/240/480/720/960/1200: use round numbers (the auto-divide-by-five tell also appears on folio 83's 5.6/11.2/16.8 ticks).
2. Folio 42, Figure 04.01: three bars differing by 5-10 percent communicate nothing; axis has no unit. Replace with the table or a stat line. Caption says VAT "at sale" while body says at purchase; fix.
3. Folio 19 slope chart: ambiguous label-to-line mapping, no start values. Add leaders and 2021 values. Figure dek calls the UHNWI chart "the supply story"; it is the demand story.
4. Folio 32, Figure 03.01: axis 0-3000 unitless against EUR labels; state "EUR thousands".
5. Folio 96 table: tilde in "~12%" renders as a minus sign. Fix the glyph.
6. Value-label consistency: "EUR 381 m" vs "EUR 396.8 m" (folio 21); "minus 12.6 to minus 8.97 percent" (folio 21). One precision rule.
7. Wide two-column tables (folio 43): 90mm scan gap between label and value with no leaders. Add leaders or close the gap.
8. Chart typography generally reads cheaper than the book (raw mono axis labels). Bring figure type into the design system.

## H. Back matter completion

1. Colophon: add ISBN (and ISSN, it is an annual), copyright line, printer credit. Add folio/running head or deliberately style it as bare, but match the glossary/sources treatment decision.
2. Resolve the four "To be appointed" editorial board lines: confirmed names or cut the slots.
3. Image credits in this edition (see E1).
4. Folio 113: right column holds a two-line continuation then an empty column. Rebalance the glossary.
5. Final page (PDF p121): anonymous stock of a dinghy fleet, no wordmark, no credit. Close with the house mark, the wordmark, or a plain colour page. The book must not just stop on unattributed stock.
6. Folio 104 inset promises "the ten questions... collected on a single reference page". Confirm that page exists and cross-reference it by folio, or cut the promise.

## I. Do not change

These are working. Leave them exactly as they are:
- The chapter apparatus: openers (ghost numeral over full-bleed photo, coordinates, contributor strip), closers (provenance, how-to-read, correspondence, read-next), case-study metadata grids with anonymisation disclosures.
- The correspondence line "Disagreement is read in full and reflected in the next edition where it holds up."
- The colophon's self-applied independence test.
- The sources pages' citation density and the "indicative, not peer-reviewed" caveats.
- The Filippakis interview voice, including the imperfect English.
- The data-table typography (folios 43, 56, 67, 68, 84, 109-110).
- The five pitfalls (folio 40), the ten contract points (folio 50), the yards table (folio 68), the folio 13 case study, the editors' letter argument (PDF p6).

## Suggested order of work

1. Section A blockers and the global pipeline fixes (D), since several A items are instances of D bugs.
2. Section C fact-check sweep, flagging anything unresolvable for the editors.
3. Section B items to counsel in parallel.
4. Editorial passes (F), which change text flow.
5. Pagination pass (D4/D5) after the text settles.
6. Charts (G) and photography (E).
7. Back matter (H).
8. Full re-proof and a fresh QA read of every chapter end, every figure, every coordinates line.

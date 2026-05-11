/* ExtendScript run inside Adobe InDesign 2026.
   The Node wrapper (scripts/build-indd.mjs) prepends a `PAYLOAD = {...}`
   declaration before this body.

   This builds The First Owner's Reference, 1st Edition, natively in
   InDesign — proper paragraph styles, master pages, threaded body
   flow, image fitting, swatches, fonts (Newsreader, DM Mono, DM Sans).
   Saves as .indd and exports as .idml. */

#target indesign

// -- helpers --------------------------------------------------------------

function mm(n) { return n + "mm"; }
function pt(n) { return n + "pt"; }

function ensureColor(doc, name, model, space, cmyk) {
  for (var i = 0; i < doc.colors.length; i++) {
    if (doc.colors[i].name === name) return doc.colors[i];
  }
  return doc.colors.add({
    name: name,
    model: model || ColorModel.PROCESS,
    space: space || ColorSpace.CMYK,
    colorValue: cmyk,
  });
}

function ensurePStyle(doc, name, props) {
  var existing = doc.paragraphStyles.itemByName(name);
  if (existing.isValid) return existing;
  var s = doc.paragraphStyles.add({ name: name });
  for (var k in props) {
    try { s[k] = props[k]; } catch (e) {}
  }
  return s;
}

function ensureCStyle(doc, name, props) {
  var existing = doc.characterStyles.itemByName(name);
  if (existing.isValid) return existing;
  var s = doc.characterStyles.add({ name: name });
  for (var k in props) {
    try { s[k] = props[k]; } catch (e) {}
  }
  return s;
}

function setFont(style, family, faceName) {
  try {
    var font = app.fonts.itemByName(family + "\t" + faceName);
    if (font.isValid) {
      style.appliedFont = font;
      return;
    }
  } catch (e) {}
  try { style.appliedFont = family; } catch (e) {}
  try { style.fontStyle = faceName; } catch (e) {}
}

// Add a page with a chosen master applied
function addPage(doc, master) {
  var p = doc.pages.add(LocationOptions.AT_END);
  if (master) p.appliedMaster = master;
  return p;
}

// geometricBounds: [top, left, bottom, right] in mm
function tfAt(page, t, l, b, r) {
  return page.textFrames.add({ geometricBounds: [mm(t), mm(l), mm(b), mm(r)] });
}

function rectAt(page, t, l, b, r) {
  return page.rectangles.add({ geometricBounds: [mm(t), mm(l), mm(b), mm(r)] });
}

function placeImage(page, t, l, b, r, imgPath, fitMode) {
  var rect = rectAt(page, t, l, b, r);
  rect.strokeColor = "None";
  rect.fillColor = "None";
  try {
    rect.place(File(imgPath));
    rect.fit(fitMode || FitOptions.FILL_PROPORTIONALLY);
    rect.fit(FitOptions.CENTER_CONTENT);
  } catch (e) {
    $.writeln("Image place failed: " + imgPath + " — " + e);
  }
  return rect;
}

// Append a paragraph to a text frame's story with style.
function appendPara(story, text, pStyle, cStyle) {
  var insert = story.insertionPoints[-1];
  if (cStyle) insert.appliedCharacterStyle = cStyle;
  insert.appliedParagraphStyle = pStyle;
  insert.contents = text + "\r";
}

function appendMixed(story, runs, pStyle) {
  var doc = story.parent;
  while (doc && !(doc instanceof Document)) doc = doc.parent;
  var noneCS = doc.characterStyles.itemByName("[None]");

  var insert = story.insertionPoints[-1];
  insert.appliedParagraphStyle = pStyle;
  for (var i = 0; i < runs.length; i++) {
    insert = story.insertionPoints[-1];
    insert.appliedCharacterStyle = runs[i].cstyle || noneCS;
    insert.contents = runs[i].text;
  }
  story.insertionPoints[-1].contents = "\r";
}

// -- main -----------------------------------------------------------------

function build() {
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
  app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS;

  // Page setup: facing pages 230×300mm, 3mm bleed.
  var doc = app.documents.add();
  doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
  doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

  with (doc.documentPreferences) {
    pageWidth = "230mm";
    pageHeight = "300mm";
    pagesPerDocument = 1;
    facingPages = true;
    pageOrientation = PageOrientation.PORTRAIT;
    documentBleedTopOffset = "3mm";
    documentBleedBottomOffset = "3mm";
    documentBleedInsideOrLeftOffset = "3mm";
    documentBleedOutsideOrRightOffset = "3mm";
    intent = DocumentIntentOptions.PRINT_INTENT;
  }

  // --- Swatches ----
  var cInk    = ensureColor(doc, "Ink",        ColorModel.PROCESS, ColorSpace.CMYK, [60, 50, 50, 90]);
  var cSoft   = ensureColor(doc, "Soft",       ColorModel.PROCESS, ColorSpace.CMYK, [40, 30, 30, 70]);
  var cStone  = ensureColor(doc, "Stone",      ColorModel.PROCESS, ColorSpace.CMYK, [25, 25, 35, 50]);
  var cMarine = ensureColor(doc, "Marine",     ColorModel.PROCESS, ColorSpace.CMYK, [92, 60, 27, 30]);
  var cSail   = ensureColor(doc, "Sail",       ColorModel.PROCESS, ColorSpace.CMYK, [65, 35, 15, 10]);
  var cRule   = ensureColor(doc, "Rule",       ColorModel.PROCESS, ColorSpace.CMYK, [10, 12, 20, 20]);
  var cPaper  = ensureColor(doc, "Paper Tint", ColorModel.PROCESS, ColorSpace.CMYK, [2, 3, 7, 0]);

  // Document-level paper colour
  try {
    var paper = doc.colors.itemByName("Paper");
    if (paper.isValid) paper.colorValue = [2, 3, 7, 0];
  } catch (e) {}

  // --- Character styles ----
  var csItalic = ensureCStyle(doc, "Italic", { fontStyle: "Italic" });
  var csBold   = ensureCStyle(doc, "Bold",   { fontStyle: "Semibold" });
  var csMarine = ensureCStyle(doc, "Marine", { fillColor: cMarine });
  var csMono   = ensureCStyle(doc, "Mono Number", { fillColor: cMarine });
  setFont(csMono, "DM Mono", "Regular");

  // --- Paragraph styles ----
  var psBody = ensurePStyle(doc, "Body", {
    pointSize: 9.5, leading: 13,
    justification: Justification.LEFT_JUSTIFIED,
    firstLineIndent: "3mm",
    fillColor: cInk,
    hyphenation: true,
    spaceBefore: 0, spaceAfter: 0,
  });
  setFont(psBody, "Newsreader", "Regular");

  var psBodyLead = ensurePStyle(doc, "Body / Lead", {
    basedOn: psBody, firstLineIndent: 0,
    dropCapCharacters: 1, dropCapLines: 3,
  });
  setFont(psBodyLead, "Newsreader", "Regular");

  var psBodyH2 = ensurePStyle(doc, "Body / H2", {
    basedOn: psBody,
    pointSize: 13, leading: 17,
    fillColor: cMarine,
    firstLineIndent: 0,
    spaceBefore: "4mm", spaceAfter: "1.5mm",
    keepWithNext: 3,
  });
  setFont(psBodyH2, "Newsreader", "Regular");

  var psStandfirst = ensurePStyle(doc, "Standfirst", {
    basedOn: psBody, pointSize: 13, leading: 18,
    firstLineIndent: 0, fontStyle: "Italic",
    fillColor: cSoft, spaceAfter: "2mm",
  });
  setFont(psStandfirst, "Newsreader", "Italic");

  var psPullquote = ensurePStyle(doc, "Pullquote", {
    basedOn: psBody, pointSize: 15, leading: 21,
    firstLineIndent: 0, fontStyle: "Italic",
    fillColor: cMarine, spaceBefore: "3mm", spaceAfter: "2mm",
  });
  setFont(psPullquote, "Newsreader", "Italic");

  var psEditorsNote = ensurePStyle(doc, "Editor's note", {
    basedOn: psBody, pointSize: 9.5, leading: 13,
    firstLineIndent: 0, fontStyle: "Italic",
    fillColor: cSoft, spaceBefore: "3mm",
  });
  setFont(psEditorsNote, "Newsreader", "Italic");

  var psCaption = ensurePStyle(doc, "Caption", {
    basedOn: psBody, pointSize: 8.5, leading: 11,
    firstLineIndent: 0, fontStyle: "Italic",
    fillColor: cStone,
  });
  setFont(psCaption, "Newsreader", "Italic");

  var psMonoLabel = ensurePStyle(doc, "Mono / Label", {
    pointSize: 7.5, leading: 11,
    firstLineIndent: 0,
    tracking: 200,
    capitalization: Capitalization.ALL_CAPS,
    fillColor: cMarine,
    justification: Justification.LEFT_ALIGN,
    spaceAfter: "1.5mm",
  });
  setFont(psMonoLabel, "DM Mono", "Regular");

  var psMonoLabelPaper = ensurePStyle(doc, "Mono / Label Paper", {
    basedOn: psMonoLabel,
    fillColor: doc.colors.itemByName("Paper"),
  });
  setFont(psMonoLabelPaper, "DM Mono", "Regular");

  var psCoverEdition = ensurePStyle(doc, "Cover / Edition", {
    pointSize: 9, leading: 13,
    firstLineIndent: 0,
    tracking: 220,
    capitalization: Capitalization.ALL_CAPS,
    fillColor: doc.colors.itemByName("Paper"),
    justification: Justification.LEFT_ALIGN,
  });
  setFont(psCoverEdition, "DM Mono", "Regular");

  var psCoverWordmark = ensurePStyle(doc, "Cover / Wordmark", {
    pointSize: 64, leading: 64,
    firstLineIndent: 0,
    fillColor: doc.colors.itemByName("Paper"),
    fontStyle: "Light", spaceAfter: "5mm",
  });
  setFont(psCoverWordmark, "Newsreader", "Light");

  var psCoverStrap = ensurePStyle(doc, "Cover / Strap", {
    pointSize: 11, leading: 16,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: doc.colors.itemByName("Paper"),
    spaceAfter: "5mm",
  });
  setFont(psCoverStrap, "Newsreader", "Italic");

  var psCoverPublisher = ensurePStyle(doc, "Cover / Publisher", {
    pointSize: 7.5, leading: 11,
    firstLineIndent: 0,
    tracking: 220,
    capitalization: Capitalization.ALL_CAPS,
    fillColor: doc.colors.itemByName("Paper"),
  });
  setFont(psCoverPublisher, "DM Mono", "Regular");

  var psTitleHero = ensurePStyle(doc, "Title / Hero", {
    pointSize: 48, leading: 52,
    firstLineIndent: 0,
    fontStyle: "Light",
    fillColor: cInk,
    spaceAfter: "5mm",
  });
  setFont(psTitleHero, "Newsreader", "Light");

  var psTitleStrap = ensurePStyle(doc, "Title / Strap", {
    pointSize: 14, leading: 20,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: cSoft,
    spaceAfter: "5mm",
  });
  setFont(psTitleStrap, "Newsreader", "Italic");

  var psFrameBody = ensurePStyle(doc, "Title / Frame body", {
    pointSize: 10, leading: 15,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: cInk,
  });
  setFont(psFrameBody, "Newsreader", "Italic");

  var psFootValue = ensurePStyle(doc, "Title / Foot value", {
    pointSize: 10.5, leading: 14,
    firstLineIndent: 0,
    fillColor: cInk,
  });
  setFont(psFootValue, "Newsreader", "Regular");

  var psContentsItem = ensurePStyle(doc, "Contents / Item", {
    pointSize: 14, leading: 20,
    firstLineIndent: 0,
    fillColor: cInk,
    spaceAfter: "3mm",
  });
  setFont(psContentsItem, "Newsreader", "Regular");

  var psContentsStrap = ensurePStyle(doc, "Contents / Standfirst", {
    pointSize: 9, leading: 12,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: cStone,
    spaceAfter: "2mm",
  });
  setFont(psContentsStrap, "Newsreader", "Italic");

  var psChapterNumber = ensurePStyle(doc, "Chapter / Number", {
    pointSize: 220, leading: 220,
    firstLineIndent: 0,
    fontStyle: "Light",
    fillColor: doc.colors.itemByName("Paper"),
  });
  setFont(psChapterNumber, "Newsreader", "Light");

  var psChapterTitle = ensurePStyle(doc, "Chapter / Title", {
    pointSize: 48, leading: 52,
    firstLineIndent: 0,
    fontStyle: "Light",
    fillColor: doc.colors.itemByName("Paper"),
    spaceAfter: "3mm",
  });
  setFont(psChapterTitle, "Newsreader", "Light");

  var psChapterStandfirst = ensurePStyle(doc, "Chapter / Standfirst", {
    pointSize: 13, leading: 19,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: doc.colors.itemByName("Paper"),
    spaceAfter: "3mm",
  });
  setFont(psChapterStandfirst, "Newsreader", "Italic");

  var psChapterMetaLabel = ensurePStyle(doc, "Chapter / Meta label", {
    pointSize: 7, leading: 11,
    firstLineIndent: 0,
    tracking: 180,
    capitalization: Capitalization.ALL_CAPS,
    fillColor: doc.colors.itemByName("Paper"),
    spaceAfter: "1mm",
  });
  setFont(psChapterMetaLabel, "DM Mono", "Regular");

  var psChapterMetaValue = ensurePStyle(doc, "Chapter / Meta value", {
    pointSize: 10.5, leading: 14,
    firstLineIndent: 0,
    fillColor: doc.colors.itemByName("Paper"),
  });
  setFont(psChapterMetaValue, "Newsreader", "Regular");

  var psBodyTitle = ensurePStyle(doc, "Body / Title", {
    pointSize: 32, leading: 36,
    firstLineIndent: 0,
    fontStyle: "Light",
    fillColor: cInk,
    spaceAfter: "3mm",
  });
  setFont(psBodyTitle, "Newsreader", "Light");

  var psRunningHead = ensurePStyle(doc, "Running head", {
    pointSize: 8.5, leading: 11,
    firstLineIndent: 0,
    fontStyle: "Italic",
    fillColor: cStone,
    justification: Justification.RIGHT_ALIGN,
  });
  setFont(psRunningHead, "Newsreader", "Italic");

  var psGlossaryEntry = ensurePStyle(doc, "Glossary / Entry", {
    pointSize: 9.5, leading: 13,
    firstLineIndent: 0,
    fillColor: cInk,
    spaceAfter: "2mm",
  });
  setFont(psGlossaryEntry, "Newsreader", "Regular");

  // --- Master pages ----
  // Default master is "A-Master". Rename and set up.
  var mA = doc.masterSpreads.itemByName("A-Master");
  if (mA.isValid) {
    mA.namePrefix = "A";
    mA.baseName = "Body";
  }

  // --- Build pages ----
  // doc starts with one page on master A. We'll add pages as needed.

  var page1 = doc.pages.firstItem();

  // -- Page 1: COVER (right-hand single page, no master, full bleed) --
  page1.appliedMaster = null;
  buildCover(doc, page1, psCoverEdition, psCoverWordmark, psCoverStrap, psCoverPublisher);

  // -- Page 2: FRONTISPIECE (left, full bleed, no master) --
  var pFront = addPage(doc, null);
  buildFrontispiece(pFront);

  // -- Page 3: TITLE PAGE (right) --
  var pTitle = addPage(doc, null);
  buildTitlePage(doc, pTitle, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psTitleStrap: psTitleStrap,
    psFrameBody: psFrameBody,
    psFootValue: psFootValue,
  });

  // -- Page 4: IMPRINT (left) --
  var pImprint = addPage(doc, null);
  buildImprint(doc, pImprint, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psBody: psBody,
    psFootValue: psFootValue,
  });

  // -- Page 5: EDITOR'S LETTER (right) --
  var pEd = addPage(doc, mA.isValid ? mA : null);
  buildEditorsLetter(doc, pEd, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psBody: psBody,
    psBodyLead: psBodyLead,
    psStandfirst: psStandfirst,
    psRunningHead: psRunningHead,
    csItalic: csItalic,
  });

  // -- Page 6: CONTENTS (left) --
  var pContents = addPage(doc, null);
  buildContents(doc, pContents, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psContentsItem: psContentsItem,
    psContentsStrap: psContentsStrap,
    csMono: csMono,
  });

  // -- Chapters --
  for (var ci = 0; ci < PAYLOAD.sections.length; ci++) {
    var section = PAYLOAD.sections[ci];

    // Opener — right-hand page, full bleed, no master
    // Make sure opener falls on a right-hand page by inserting a blank if needed.
    forceRightHand(doc);
    var pOpener = addPage(doc, null);
    buildChapterOpener(doc, pOpener, section, {
      psMonoLabel: psChapterMetaLabel,
      psChapterNumber: psChapterNumber,
      psChapterTitle: psChapterTitle,
      psChapterStandfirst: psChapterStandfirst,
      psChapterMetaLabel: psChapterMetaLabel,
      psChapterMetaValue: psChapterMetaValue,
    });

    // Body — multi-page spread, A-Master applied, threaded text
    var essay = PAYLOAD.essays[section.slug];
    if (essay) {
      buildChapterBody(doc, mA, section, essay, {
        psBody: psBody,
        psBodyLead: psBodyLead,
        psBodyH2: psBodyH2,
        psBodyTitle: psBodyTitle,
        psStandfirst: psStandfirst,
        psMonoLabel: psMonoLabel,
        psPullquote: psPullquote,
        psEditorsNote: psEditorsNote,
        psCaption: psCaption,
        psRunningHead: psRunningHead,
        csItalic: csItalic,
        csBold: csBold,
      });
    }
  }

  // -- Closing image --
  forceRightHand(doc);
  var pClosing = addPage(doc, null);
  buildClosing(pClosing);

  // -- Glossary --
  var pGloss = addPage(doc, mA.isValid ? mA : null);
  buildGlossary(doc, pGloss, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psStandfirst: psStandfirst,
    psGlossaryEntry: psGlossaryEntry,
    csBold: csBold,
    psRunningHead: psRunningHead,
  });

  // -- Colophon --
  var pColo = addPage(doc, mA.isValid ? mA : null);
  buildColophon(doc, pColo, {
    psMonoLabel: psMonoLabel,
    psTitleHero: psTitleHero,
    psBody: psBody,
    psBodyH2: psBodyH2,
    psRunningHead: psRunningHead,
  });

  // --- Save and export ----
  var inddFile = File(PAYLOAD.outIndd);
  if (inddFile.exists) inddFile.remove();
  doc.save(inddFile);

  var idmlFile = File(PAYLOAD.outIdml);
  if (idmlFile.exists) idmlFile.remove();
  doc.exportFile(ExportFormat.INDESIGN_MARKUP, idmlFile);

  doc.close(SaveOptions.YES);
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
}

// -- Page builders --------------------------------------------------------

function forceRightHand(doc) {
  // Ensure next added page is a right-hand page (odd number).
  // doc.pages.length is current count; next added page will be length+1.
  // Pages are 1-indexed in InDesign; odd page numbers are right-hand for facing layouts.
  if ((doc.pages.length + 1) % 2 === 0) {
    addPage(doc, null);  // blank left page
  }
}

function buildCover(doc, page, psEdition, psWordmark, psStrap, psPublisher) {
  // Full-bleed cover image: from -3mm to 233mm wide and -3mm to 303mm tall
  placeImage(page, -3, -3, 303, 233, PAYLOAD.images.cover);

  // Edition (top-left)
  var ed = tfAt(page, 16, 18, 28, 110);
  appendPara(ed.parentStory, "1st Edition · 2026", psEdition);

  // Wordmark + strap + publisher (lower-left block)
  var tf = tfAt(page, 200, 18, 290, 215);
  var st = tf.parentStory;
  appendPara(st, "The First Owner\u2019s Reference", psWordmark);
  appendPara(st, "An annual editorial publication for first-time superyacht buyers.", psStrap);
  appendPara(st, "Foreland Marine · London", psPublisher);
}

function buildFrontispiece(page) {
  placeImage(page, -3, -3, 303, 233, PAYLOAD.images.frontispiece);
}

function buildTitlePage(doc, page, sty) {
  // Paper background (the doc Paper colour already shows; no rectangle needed if Paper is set)
  // Edition mark
  var ed = tfAt(page, 28, 22, 38, 100);
  appendPara(ed.parentStory, "1st Edition · 2026", sty.psMonoLabel);

  // Title
  var ti = tfAt(page, 44, 22, 92, 208);
  appendPara(ti.parentStory, "The First Owner\u2019s Reference", sty.psTitleHero);

  // Strap
  var st = tfAt(page, 100, 22, 145, 175);
  appendPara(st.parentStory, "An annual editorial publication on the structural, financial, and operational dimensions of first-time superyacht acquisition. Or rather, how to buy a boat.", sty.psTitleStrap);

  // Publisher's frame label + body
  var fl = tfAt(page, 158, 22, 165, 100);
  appendPara(fl.parentStory, "The publisher\u2019s frame", sty.psMonoLabel);
  var fb = tfAt(page, 167, 22, 200, 165);
  appendPara(fb.parentStory, "The publication is funded by an independent superyacht consultancy that holds no yard affiliations and takes no broker commissions. It is published once a year, in print and online. It carries no advertising. Sources are named in the back matter. The independence test in the closing chapter is offered for application to the publisher first.", sty.psFrameBody);

  // Foot metadata row
  var fields = [
    { label: "Publisher", value: "Foreland Marine, London" },
    { label: "Web", value: "firstownersreference.com" },
    { label: "Edition", value: "First, September 2026" },
  ];
  for (var i = 0; i < fields.length; i++) {
    var x = 22 + i * 62;
    var lbl = tfAt(page, 218, x, 224, x + 58);
    appendPara(lbl.parentStory, fields[i].label, sty.psMonoLabel);
    var val = tfAt(page, 226, x, 234, x + 58);
    appendPara(val.parentStory, fields[i].value, sty.psFootValue);
  }

  // Section list label
  var ll = tfAt(page, 248, 22, 254, 100);
  appendPara(ll.parentStory, "In this edition", sty.psMonoLabel);

  // Section list, 3-column small grid
  var colW = 62;
  for (var s = 0; s < PAYLOAD.sections.length; s++) {
    var sec = PAYLOAD.sections[s];
    var col = s % 3;
    var row = Math.floor(s / 3);
    var sx = 22 + col * colW;
    var sy = 258 + row * 12;
    var sl = tfAt(page, sy, sx, sy + 10, sx + colW - 4);
    var ss = sl.parentStory;
    appendMixed(ss, [
      { text: String("0" + sec.number).slice(-2) + "    ", cstyle: sty.psMonoLabel && sty.csMono ? sty.csMono : null },
      { text: sec.title },
    ], sty.psFootValue);
  }
}

function buildImprint(doc, page, sty) {
  // Label + title
  var lbl = tfAt(page, 28, 22, 36, 120);
  appendPara(lbl.parentStory, "Imprint & Masthead", sty.psMonoLabel);

  var ti = tfAt(page, 40, 22, 70, 208);
  appendPara(ti.parentStory, "The First Owner\u2019s Reference, 1st Edition, 2026.", sty.psTitleHero);

  // Three-column body
  var body = page.textFrames.add({
    geometricBounds: [mm(78), mm(22), mm(112), mm(208)],
    textFramePreferences: { textColumnCount: 3, textColumnGutter: "6mm" },
  });
  var bs = body.parentStory;
  appendPara(bs, "Published by Foreland Marine Consultancy Limited, 7 Bell Yard, London WC2A 2JR. ISSN pending. © 2026 Foreland Marine Consultancy Limited. All rights reserved. No advertising, ever.", sty.psBody);
  appendPara(bs, "Set in Newsreader by Production Type and DM Mono by Indian Type Foundry. Printed on Munken Pure 120 gsm uncoated text stock with GF Smith Colorplan cover boards. Smyth-sewn, casebound. Trim 230 by 300 mm. Five hundred copies, hand numbered.", sty.psBody);
  appendPara(bs, "Editorial correspondence: editors@firstownersreference.com. The independence test that runs through this publication is applied to the publisher itself. The full disclosure is on the colophon at the back of this edition.", sty.psBody);

  // Three-row masthead grid (3 cols × 3 rows = 9 entries)
  var masthead = [
    { label: "Co-editors in Chief", name: "Jack MacNally", role: "" },
    { label: "Production", name: "Foreland Marine in-house", role: "Designer engaged for the press edition" },
    { label: "Indexer", name: "Working draft auto-set", role: "Re-set by professional indexer for the press edition" },
    { label: "Publisher", name: "Foreland Marine Consultancy", role: "Independent superyacht consultancy, London" },
    { label: "Photography", name: "Stock for proof; commissioned for press", role: "Picture editor engaged June 2026" },
    { label: "Copy editor", name: "In-house", role: "External pass scheduled August 2026" },
    { label: "Editorial board", name: "To be confirmed", role: "Three external advisors, named in the second edition" },
    { label: "Web", name: "firstownersreference.com", role: "Updated quarterly between editions" },
    { label: "Bindery", name: "UK fine bindery, TBC", role: "Smyth-sewn, casebound, hand numbered" },
  ];
  for (var i = 0; i < masthead.length; i++) {
    var col = i % 3;
    var row = Math.floor(i / 3);
    var x = 22 + col * 62;
    var y = 130 + row * 36;
    var lbl2 = tfAt(page, y, x, y + 5, x + 58);
    appendPara(lbl2.parentStory, masthead[i].label, sty.psMonoLabel);
    var name = tfAt(page, y + 6, x, y + 14, x + 58);
    appendPara(name.parentStory, masthead[i].name, sty.psFootValue);
    if (masthead[i].role) {
      var role = tfAt(page, y + 14, x, y + 24, x + 58);
      appendPara(role.parentStory, masthead[i].role, sty.psBody);
    }
  }

  // Editor's letter signature in masthead block 1
  var sigY = 130 + 6 + 14; // under first block
  var sig2 = tfAt(page, sigY, 22, sigY + 7, 80);
  appendPara(sig2.parentStory, "Daniel Marks", sty.psFootValue);

  // Note at bottom
  var noteLbl = tfAt(page, 244, 22, 250, 100);
  appendPara(noteLbl.parentStory, "A note on the first edition", sty.psMonoLabel);
  var note = page.textFrames.add({
    geometricBounds: [mm(252), mm(22), mm(286), mm(208)],
    textFramePreferences: { textColumnCount: 3, textColumnGutter: "6mm" },
  });
  var ns = note.parentStory;
  appendPara(ns, "This is the first edition. Where editorial roles are listed as to be confirmed, the appointment is in process and will be named in the colophon of the press edition. Where contributors are still being approached, the chapter carries a placeholder.", sty.psBody);
  appendPara(ns, "The publication is funded by Foreland Marine Consultancy Limited as a working reference. It carries no advertising, accepts no broker commissions, and takes no editorial direction from yards. Sources are named in the back matter.", sty.psBody);
  appendPara(ns, "Reader correspondence reaches the editors directly at editors@firstownersreference.com. Errata, contributor recommendations, and disagreements are read in full and acknowledged. The next edition is scheduled for September 2027.", sty.psBody);
}

function buildEditorsLetter(doc, page, sty) {
  // Running head
  var rh = tfAt(page, 20, 130, 28, 208);
  appendPara(rh.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);

  var lbl = tfAt(page, 40, 22, 48, 120);
  appendPara(lbl.parentStory, "From the editors", sty.psMonoLabel);

  var ti = tfAt(page, 52, 22, 100, 165);
  appendPara(ti.parentStory, "A reference written from the other side of the table.", sty.psTitleHero);

  // 2-column body
  var body = page.textFrames.add({
    geometricBounds: [mm(110), mm(22), mm(220), mm(208)],
    textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
  });
  var bs = body.parentStory;
  appendPara(bs, "The superyacht trade press is funded by the yards and brokers whose interests it covers. That is not a moral failing. It is simply how those publications fund themselves. This one is funded differently, and written differently.", sty.psStandfirst);
  appendPara(bs, "The independence is structural rather than stylistic. The First Owner\u2019s Reference is published once a year, in print and online, by an independent consultancy that holds no yard affiliations and takes no broker commissions.", sty.psBody);
  appendPara(bs, "It is written for the reader who has recently exited a business or come into liquidity, has the means to buy a yacht, and would like to do so with full visibility of cost, time, and the structure of the conversations ahead.", sty.psBody);
  appendPara(bs, "The publication is structured in numbered chapters. Each carries a lead essay, a data spread, a guest opinion from a named contributor, an anonymised case, and a one-page checklist. The aim is a calm, evidence-led reference a first-time owner can hold alongside the conversations that matter.", sty.psBody);
  appendPara(bs, "Read in any order. Run your own numbers through the calculator on the website. The independence test in the closing chapter is offered for application to the publisher first, and then to any other firm a reader is considering.", sty.psBody);
  appendPara(bs, "Editorial correspondence reaches us at editors@firstownersreference.com and is read by the team personally. We do hope it is useful.", sty.psBody);
  appendPara(bs, "Jack MacNally and Daniel Marks\rCo-editors in Chief, London, September 2026", sty.psStandfirst);
}

function buildContents(doc, page, sty) {
  var lbl1 = tfAt(page, 20, 22, 28, 100);
  appendPara(lbl1.parentStory, "1st Edition", sty.psMonoLabel);

  var lbl2 = tfAt(page, 40, 22, 48, 100);
  appendPara(lbl2.parentStory, "Contents", sty.psMonoLabel);

  var ti = tfAt(page, 52, 22, 80, 165);
  appendPara(ti.parentStory, "Nine chapters.", sty.psTitleHero);

  // Chapter list
  var y = 96;
  for (var i = 0; i < PAYLOAD.sections.length; i++) {
    var sec = PAYLOAD.sections[i];
    // Number
    var num = tfAt(page, y, 22, y + 6, 36);
    appendPara(num.parentStory, "CH " + String("0" + sec.number).slice(-2), sty.psMonoLabel);
    // Title
    var ti2 = tfAt(page, y - 2, 40, y + 8, 200);
    appendPara(ti2.parentStory, sec.title, sty.psContentsItem);
    // Standfirst
    var sf = tfAt(page, y + 6, 40, y + 14, 200);
    appendPara(sf.parentStory, sec.standfirst, sty.psContentsStrap);
    // Rule line
    var rule = page.graphicLines.add({
      geometricBounds: [mm(y - 2), mm(22), mm(y - 2), mm(208)],
    });
    rule.strokeWeight = "0.3pt";
    rule.strokeColor = doc.colors.itemByName("Rule");
    y += 16;
  }

  // Reference items
  y += 4;
  var refs = [
    { letter: "A", title: "Glossary", strap: "46 terms drawn from across the chapters, set as a continuous reference." },
    { letter: "B", title: "Index (working)", strap: "Auto-generated from chapter section headings, glossary terms, and named entities." },
    { letter: "C", title: "Sources", strap: "Consolidated bibliography by chapter, with named publications, practitioners, and court citations." },
    { letter: "D", title: "Colophon", strap: "Editorial principles, type, paper, photography, and the publisher\u2019s own answers to the independence test." },
  ];
  for (var r = 0; r < refs.length; r++) {
    var num2 = tfAt(page, y, 22, y + 6, 36);
    appendPara(num2.parentStory, refs[r].letter, sty.psMonoLabel);
    var ti3 = tfAt(page, y - 2, 40, y + 8, 200);
    appendPara(ti3.parentStory, refs[r].title, sty.psContentsItem);
    var sf2 = tfAt(page, y + 6, 40, y + 14, 200);
    appendPara(sf2.parentStory, refs[r].strap, sty.psContentsStrap);
    var rule2 = page.graphicLines.add({
      geometricBounds: [mm(y - 2), mm(22), mm(y - 2), mm(208)],
    });
    rule2.strokeWeight = "0.3pt";
    rule2.strokeColor = doc.colors.itemByName("Rule");
    y += 16;
  }
}

function buildChapterOpener(doc, page, section, sty) {
  // Full-bleed image
  var heroPath = PAYLOAD.images.chapters[section.slug];
  if (heroPath) placeImage(page, -3, -3, 303, 233, heroPath);

  // Chapter label top-left
  var lbl = tfAt(page, 20, 18, 28, 110);
  appendPara(lbl.parentStory, "Chapter " + String("0" + section.number).slice(-2), sty.psMonoLabel);

  // Huge chapter number
  var num = tfAt(page, 30, 18, 110, 200);
  appendPara(num.parentStory, String("0" + section.number).slice(-2), sty.psChapterNumber);

  // Title bottom-left
  var ti = tfAt(page, 220, 18, 252, 210);
  appendPara(ti.parentStory, section.title, sty.psChapterTitle);

  // Standfirst
  var sf = tfAt(page, 254, 18, 270, 175);
  appendPara(sf.parentStory, section.standfirst, sty.psChapterStandfirst);

  // Rule
  var rule = page.graphicLines.add({
    geometricBounds: [mm(274), mm(18), mm(274), mm(150)],
  });
  rule.strokeWeight = "0.5pt";
  rule.strokeColor = doc.colors.itemByName("Paper");

  // Reading time + coordinates
  var essay = PAYLOAD.essays[section.slug];
  var readingTime = (essay && essay.readingTime) || "6 min read";
  var rtLbl = tfAt(page, 278, 18, 282, 80);
  appendPara(rtLbl.parentStory, "Reading time", sty.psChapterMetaLabel);
  var rtVal = tfAt(page, 282, 18, 290, 80);
  appendPara(rtVal.parentStory, readingTime, sty.psChapterMetaValue);

  var coLbl = tfAt(page, 278, 82, 282, 200);
  appendPara(coLbl.parentStory, "Coordinates", sty.psChapterMetaLabel);
  var coVal = tfAt(page, 282, 82, 290, 200);
  appendPara(coVal.parentStory, section.coordinates || "", sty.psChapterMetaValue);
}

function buildChapterBody(doc, master, section, essay, sty) {
  // 4 linked spreads per chapter (left+right facing), so 8 pages of flow.
  // First page (left): title strip + 2-column body start
  var firstPage = addPage(doc, master.isValid ? master : null);
  var leftFrames = [];
  var rightFrames = [];

  // Build title block on first body page
  var rh = tfAt(firstPage, 20, 22, 28, 208);
  appendPara(rh.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);

  var lbl = tfAt(firstPage, 40, 22, 48, 200);
  appendPara(lbl.parentStory, "Chapter " + String("0" + section.number).slice(-2) + " · Lead essay", sty.psMonoLabel);

  var ti = tfAt(firstPage, 52, 22, 100, 200);
  appendPara(ti.parentStory, essay.title, sty.psBodyTitle);

  var sf = tfAt(firstPage, 96, 22, 130, 200);
  appendPara(sf.parentStory, essay.standfirst, sty.psStandfirst);

  // Two-column body starting below the standfirst on the first page,
  // continued on the next 5 pages.
  var BODY_PAGES = 6;
  var bodyFrames = [];

  // First body frame on firstPage starts at y=140mm
  var f0 = firstPage.textFrames.add({
    geometricBounds: [mm(140), mm(22), mm(282), mm(208)],
    textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
  });
  bodyFrames.push(f0);

  for (var b = 1; b < BODY_PAGES; b++) {
    var p = addPage(doc, master.isValid ? master : null);
    // Running head
    var rh2 = tfAt(p, 20, 22, 28, 208);
    appendPara(rh2.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);
    var f = p.textFrames.add({
      geometricBounds: [mm(36), mm(22), mm(282), mm(208)],
      textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
    });
    bodyFrames.push(f);
  }

  // Thread frames
  for (var t = 0; t < bodyFrames.length - 1; t++) {
    bodyFrames[t].nextTextFrame = bodyFrames[t + 1];
  }

  // Populate body story
  var story = bodyFrames[0].parentStory;
  var first = true;
  for (var pi = 0; pi < essay.paragraphs.length; pi++) {
    var para = essay.paragraphs[pi];
    if (para.kind === "p") {
      appendPara(story, para.text, first ? sty.psBodyLead : sty.psBody);
      first = false;
    } else if (para.kind === "h2") {
      appendPara(story, para.text, sty.psBodyH2);
      first = true;
    } else if (para.kind === "quote") {
      appendPara(story, para.text, sty.psPullquote);
      first = false;
    } else if (para.kind === "note") {
      appendPara(story, para.text, sty.psEditorsNote);
      first = false;
    } else if (para.kind === "caption") {
      appendPara(story, para.text, sty.psCaption);
    }
  }
}

function buildClosing(page) {
  placeImage(page, -3, -3, 303, 233, PAYLOAD.images.closing);
}

function buildGlossary(doc, page, sty) {
  var rh = tfAt(page, 20, 22, 28, 208);
  appendPara(rh.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);

  var lbl = tfAt(page, 40, 22, 48, 100);
  appendPara(lbl.parentStory, "A — Reference", sty.psMonoLabel);

  var ti = tfAt(page, 52, 22, 80, 165);
  appendPara(ti.parentStory, "Glossary", sty.psTitleHero);

  var sf = tfAt(page, 84, 22, 110, 165);
  appendPara(sf.parentStory, "Terms used across the chapters, set as a continuous reference. Cross-references appear in italic in the body of the chapter where the term is first defined.", sty.psStandfirst);

  // Multi-page two-column body, threaded
  var pages = [page];
  for (var i = 0; i < 2; i++) {
    pages.push(addPage(doc, page.appliedMaster));
  }
  var frames = [];
  frames.push(page.textFrames.add({
    geometricBounds: [mm(116), mm(22), mm(282), mm(208)],
    textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
  }));
  for (var f = 1; f < pages.length; f++) {
    var rhx = tfAt(pages[f], 20, 22, 28, 208);
    appendPara(rhx.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);
    frames.push(pages[f].textFrames.add({
      geometricBounds: [mm(36), mm(22), mm(282), mm(208)],
      textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
    }));
  }
  for (var t = 0; t < frames.length - 1; t++) frames[t].nextTextFrame = frames[t + 1];

  var story = frames[0].parentStory;
  for (var g = 0; g < PAYLOAD.glossary.length; g++) {
    var entry = PAYLOAD.glossary[g];
    appendMixed(story, [
      { text: entry.term + ". ", cstyle: sty.csBold },
      { text: entry.definition },
    ], sty.psGlossaryEntry);
  }
}

function buildColophon(doc, page, sty) {
  var rh = tfAt(page, 20, 22, 28, 208);
  appendPara(rh.parentStory, "The First Owner\u2019s Reference", sty.psRunningHead);

  var lbl = tfAt(page, 40, 22, 48, 100);
  appendPara(lbl.parentStory, "D — Reference", sty.psMonoLabel);

  var ti = tfAt(page, 52, 22, 80, 165);
  appendPara(ti.parentStory, "Colophon", sty.psTitleHero);

  var body = page.textFrames.add({
    geometricBounds: [mm(90), mm(22), mm(282), mm(208)],
    textFramePreferences: { textColumnCount: 2, textColumnGutter: "6mm" },
  });
  var bs = body.parentStory;
  appendPara(bs, "Type and paper", sty.psBodyH2);
  appendPara(bs, "Set in Newsreader by Production Type and DM Mono by Indian Type Foundry. Printed on Munken Pure 120 gsm uncoated text stock with GF Smith Colorplan cover boards. Smyth-sewn, casebound. Trim 230 by 300 mm. Five hundred copies, hand-numbered.", sty.psBody);
  appendPara(bs, "Editorial principles", sty.psBodyH2);
  appendPara(bs, "Published by Foreland Marine Consultancy Limited, 7 Bell Yard, London WC2A 2JR. ISSN pending. © 2026 Foreland Marine Consultancy Limited. All rights reserved. No advertising, ever. The publication holds no yard affiliations and takes no broker commissions.", sty.psBody);
  appendPara(bs, "Editorial correspondence: editors@firstownersreference.com. The independence test that runs through this publication is applied to the publisher itself.", sty.psBody);
}

// -- run ------------------------------------------------------------------

try {
  build();
} catch (e) {
  alert("Build failed: " + e + "\n" + (e.line ? "Line " + e.line : ""));
  throw e;
}

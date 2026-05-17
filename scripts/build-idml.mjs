#!/usr/bin/env node
/*
  Native InDesign reconstruction of The First Owner's Reference.

  Reads content from lib/sections.ts, lib/lead-essays.ts, lib/glossary.ts
  and the print-images manifest, then produces an .idml in which every
  text and image element is a native, editable InDesign object with the
  right paragraph styles, character styles, and colour swatches.

  Output:
    ~/Desktop/firstownersreference.idml

  The IDML links the cover/frontispiece/chapter/supporting/closing JPEGs
  in this repo at public/print-images/print/ by absolute file:// URI.
  Move the IDML and relink in InDesign if you copy it elsewhere.

  This is the first pass. It covers cover, frontispiece, title page +
  imprint + contents, each chapter opener, each chapter body (as a
  single overset story the designer flows), closing image, glossary,
  colophon. Data spreads, case studies, guest opinions, contributors
  page, index, and sources are not yet rendered. Re-run the script
  after edits to lib/*.ts to regenerate.

  Usage:
    node scripts/build-idml.mjs
*/

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const REPO_ROOT = "/Users/jack/firstownersreference";
const IMG_SRC_DIR = path.join(REPO_ROOT, "public/print-images/print");
const OUT_FILE = path.join(os.homedir(), "Desktop", "firstownersreference.idml");
const WORK_DIR = path.join(os.tmpdir(), `idml-build-${Date.now()}`);

const MM = 72 / 25.4;
const PAGE_W = 230 * MM;
const PAGE_H = 300 * MM;
const BLEED  = 3 * MM;
const M_OUT  = 18 * MM;  // outer
const M_IN   = 22 * MM;  // gutter/inner
const M_TOP  = 22 * MM;
const M_BOT  = 22 * MM;
const COL_GAP = 6 * MM;

const log = (m) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`);

let _idCounter = 0;
const nextId = (prefix) => `${prefix}${++_idCounter}`;

const XML_HEADER =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
  `<?aid style="50" type="document" readerVersion="6.0" featureSet="257" product="9.0(105)" ?>\n`;

const pkg = (inner) => XML_HEADER + inner;
const fmt = (n) => Number(n).toFixed(4);

function escAttr(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]),
  );
}
function escContent(s) {
  return String(s ?? "").replace(/[&<>]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]),
  );
}

function writeFile(rel, content) {
  const full = path.join(WORK_DIR, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function getJpegSize(jpgPath) {
  const buf = fs.readFileSync(jpgPath);
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("Not a JPEG: " + jpgPath);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error("Bad JPEG marker at " + i + " in " + jpgPath);
    const marker = buf[i + 1];
    i += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    const segLen = buf.readUInt16BE(i);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const h = buf.readUInt16BE(i + 3);
      const w = buf.readUInt16BE(i + 5);
      return { width: w, height: h };
    }
    i += segLen;
  }
  throw new Error("No SOF marker found in " + jpgPath);
}

async function loadContent() {
  const tmpDir = path.join(REPO_ROOT, ".tmp-idml-build");
  fs.mkdirSync(tmpDir, { recursive: true });
  const loaderPath = path.join(tmpDir, "loader.ts");
  fs.writeFileSync(loaderPath,
    `export { sections } from "${REPO_ROOT}/lib/sections";
export { leadEssays } from "${REPO_ROOT}/lib/lead-essays";
export { glossaryEntries } from "${REPO_ROOT}/lib/glossary";
export { printImages } from "${REPO_ROOT}/lib/print-images";
`);
  execSync(
    `npx --yes esbuild --bundle --platform=node --format=esm --outfile=${tmpDir}/content.mjs ${loaderPath}`,
    { stdio: "pipe" },
  );
  const mod = await import(pathToFileURL(`${tmpDir}/content.mjs`).href);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  return mod;
}

// === IDML element generators ===

// Page-local coordinates: (0,0) top-left, (W,H) bottom-right.
// Spread coords: page centred at origin. Convert with px,py = x - PAGE_W/2, y - PAGE_H/2.
function rectPath(w, h) {
  return `<PathGeometry>
  <GeometryPathType PathOpen="false">
    <PathPointArray>
      <PathPointType Anchor="0 0" LeftDirection="0 0" RightDirection="0 0"/>
      <PathPointType Anchor="0 ${fmt(h)}" LeftDirection="0 ${fmt(h)}" RightDirection="0 ${fmt(h)}"/>
      <PathPointType Anchor="${fmt(w)} ${fmt(h)}" LeftDirection="${fmt(w)} ${fmt(h)}" RightDirection="${fmt(w)} ${fmt(h)}"/>
      <PathPointType Anchor="${fmt(w)} 0" LeftDirection="${fmt(w)} 0" RightDirection="${fmt(w)} 0"/>
    </PathPointArray>
  </GeometryPathType>
</PathGeometry>`;
}

function imageRect({ id, layer = "uLayerArt", x, y, w, h, imagePath, fit = "fill", locked = false }) {
  const rectId = id || nextId("uRect");
  const imgId = nextId("uImg");
  const linkId = nextId("uLink");

  const { width: pxW, height: pxH } = getJpegSize(imagePath);
  const ptPerPx = 1; // placeholder; transform handles scale
  const imgPtW = pxW * (72 / 300); // assume 300dpi native; scaled by transform anyway
  const imgPtH = pxH * (72 / 300);

  // Compute scale to fit `fill` (cover) or `contain` (fit)
  let scale, tx, ty;
  if (fit === "fill") {
    scale = Math.max(w / imgPtW, h / imgPtH);
    const drawnW = imgPtW * scale;
    const drawnH = imgPtH * scale;
    tx = (w - drawnW) / 2;
    ty = (h - drawnH) / 2;
  } else {
    scale = Math.min(w / imgPtW, h / imgPtH);
    const drawnW = imgPtW * scale;
    const drawnH = imgPtH * scale;
    tx = (w - drawnW) / 2;
    ty = (h - drawnH) / 2;
  }

  const spX = x - PAGE_W / 2;
  const spY = y - PAGE_H / 2;
  const fileURI = "file://" + encodeURI(imagePath).replace(/'/g, "%27");

  return `<Rectangle Self="${rectId}" StoryTitle="$ID/" ContentType="GraphicType" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0" GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0" ItemLayer="${layer}" Locked="${locked}" LocalDisplaySetting="Default" GradientFillHiliteLength="0" GradientFillHiliteAngle="0" GradientStrokeHiliteLength="0" GradientStrokeHiliteAngle="0" AppliedObjectStyle="ObjectStyle/$ID/[Normal Graphics Frame]" Visible="true" Name="$ID/" HorizontalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" VerticalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" ItemTransform="1 0 0 1 ${fmt(spX)} ${fmt(spY)}" FillColor="Swatch/None" StrokeColor="Swatch/None" StrokeWeight="0">
  <Properties>
    ${rectPath(w, h)}
  </Properties>
  <Image Self="${imgId}" Visible="true" Name="$ID/" ItemLayer="${layer}" Locked="false" LocalDisplaySetting="Default" ImageRenderingIntent="UseColorSettings" ImageTypeName="$ID/JPEG" ActualPpi="300 300" EffectivePpi="${Math.round(300 / scale)} ${Math.round(300 / scale)}" ItemTransform="${fmt(scale)} 0 0 ${fmt(scale)} ${fmt(tx)} ${fmt(ty)}">
    <Properties>
      <Profile type="string">$ID/Embedded</Profile>
      <GraphicBounds Left="0" Top="0" Right="${fmt(imgPtW)}" Bottom="${fmt(imgPtH)}"/>
    </Properties>
    <Link Self="${linkId}" AssetURL="$ID/" AssetID="$ID/" LinkResourceURI="${escAttr(fileURI)}" LinkResourceFormat="$ID/JPEG" StoredState="Normal" LinkClassID="35906" LinkClientID="257" LinkResourceModified="false" LinkObjectModified="false" ShowInUI="true" CanEmbed="true" CanUnembed="true" CanPackage="true" ImportPolicy="NoAutoImport" ExportPolicy="NoAutoExport"/>
  </Image>
</Rectangle>`;
}

function textFrame({ id, storyId, layer = "uLayerText", x, y, w, h, columns = 1, columnGutter = 0, fillColor = "Swatch/None", strokeColor = "Swatch/None", nextFrame = "n", prevFrame = "n", insetTop = 0, insetBottom = 0, insetLeft = 0, insetRight = 0, verticalJustification = "TopAlign" }) {
  const tfId = id || nextId("uTF");
  const spX = x - PAGE_W / 2;
  const spY = y - PAGE_H / 2;
  return `<TextFrame Self="${tfId}" ParentStory="${storyId}" PreviousTextFrame="${prevFrame}" NextTextFrame="${nextFrame}" ContentType="TextType" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0" GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0" ItemLayer="${layer}" Locked="false" LocalDisplaySetting="Default" GradientFillHiliteLength="0" GradientFillHiliteAngle="0" GradientStrokeHiliteLength="0" GradientStrokeHiliteAngle="0" AppliedObjectStyle="ObjectStyle/$ID/[Normal Text Frame]" Visible="true" Name="$ID/" HorizontalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" VerticalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" ItemTransform="1 0 0 1 ${fmt(spX)} ${fmt(spY)}" FillColor="${fillColor}" StrokeColor="${strokeColor}">
  <Properties>
    ${rectPath(w, h)}
    <TextFramePreference TextColumnCount="${columns}" TextColumnGutter="${fmt(columnGutter)}" TextColumnFixedWidth="${fmt((w - (columns - 1) * columnGutter) / columns)}" VerticalJustification="${verticalJustification}">
      <Properties>
        <InsetSpacing type="list">
          <ListItem type="unit">${fmt(insetTop)}</ListItem>
          <ListItem type="unit">${fmt(insetLeft)}</ListItem>
          <ListItem type="unit">${fmt(insetBottom)}</ListItem>
          <ListItem type="unit">${fmt(insetRight)}</ListItem>
        </InsetSpacing>
      </Properties>
    </TextFramePreference>
  </Properties>
</TextFrame>`;
}

// runs = [{ style?: charStyleName, text: string, italic?: bool }]
function paraRange(pstyle, runs) {
  const charRanges = runs.map((r) => {
    const cstyle = r.style || "CharacterStyle/$ID/[No character style]";
    const extra = r.italic ? ' FontStyle="Italic"' : "";
    return `  <CharacterStyleRange AppliedCharacterStyle="${cstyle}"${extra}>
    <Content>${escContent(r.text)}</Content>
  </CharacterStyleRange>`;
  }).join("\n");
  return `<ParagraphStyleRange AppliedParagraphStyle="${pstyle}">
${charRanges}
</ParagraphStyleRange>
<Br />`;
}

function storyXml(storyId, paragraphs, options = {}) {
  return pkg(
`<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Story Self="${storyId}" UserText="true" IsEndnoteStory="false" AppliedTOCStyle="n" TrackChanges="false" StoryTitle="${escAttr(options.title || storyId)}" AppliedNamedGrid="n">
    <StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection"/>
    <InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false"/>
    ${paragraphs.join("\n")}
  </Story>
</idPkg:Story>`,
  );
}

// === Build a Spread XML from page items ===
function spreadXml({ spreadId, pageId, items, master = "n", pageName = "1" }) {
  return pkg(
`<idPkg:Spread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Spread Self="${spreadId}" PageCount="1" BindingLocation="0" AllowPageShuffle="true" ItemTransform="1 0 0 1 0 0" ShowMasterItems="true" PageTransitionType="None" PageTransitionDirection="NotApplicable" PageTransitionDuration="Medium" FlattenerOverride="Default">
    <FlattenerPreference LineArtAndTextResolution="300" GradientAndMeshResolution="150" ClipComplexRegions="false" ConvertAllStrokesToOutlines="false" ConvertAllTextToOutlines="false">
      <Properties>
        <RasterVectorBalance type="double">50</RasterVectorBalance>
      </Properties>
    </FlattenerPreference>
    <Page Self="${pageId}" Name="${escAttr(pageName)}" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="${fmt(-PAGE_H/2)} ${fmt(-PAGE_W/2)} ${fmt(PAGE_H/2)} ${fmt(PAGE_W/2)}" ItemTransform="1 0 0 1 0 0" AppliedMaster="${master}">
      <Properties>
        <Descriptor type="list">
          <ListItem type="string">$ID/</ListItem>
          <ListItem type="enumeration">Arabic</ListItem>
          <ListItem type="boolean">true</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="long">1</ListItem>
          <ListItem type="string"></ListItem>
          <ListItem type="long">0</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="boolean">true</ListItem>
          <ListItem type="boolean">false</ListItem>
        </Descriptor>
        <PageColor type="enumeration">UseMasterColor</PageColor>
      </Properties>
      <MarginPreference ColumnCount="2" ColumnGutter="${fmt(COL_GAP)}" Top="${fmt(M_TOP)}" Bottom="${fmt(M_BOT)}" Left="${fmt(M_IN)}" Right="${fmt(M_OUT)}" ColumnDirection="Horizontal" ColumnsPositions="0 ${fmt((PAGE_W - M_IN - M_OUT - COL_GAP)/2)} ${fmt((PAGE_W - M_IN - M_OUT - COL_GAP)/2 + COL_GAP)} ${fmt(PAGE_W - M_IN - M_OUT)}"/>
    </Page>
    ${items.join("\n    ")}
  </Spread>
</idPkg:Spread>`,
  );
}

// === Section builders ===

function buildCover(printImages) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];

  // Full-bleed cover image
  const coverPath = path.join(IMG_SRC_DIR, printImages.cover.filename);
  items.push(imageRect({
    layer: "uLayerArt",
    x: -BLEED, y: -BLEED,
    w: PAGE_W + 2 * BLEED, h: PAGE_H + 2 * BLEED,
    imagePath: coverPath,
    fit: "fill",
    locked: true,
  }));

  // Edition mark (top-left)
  const editionStory = nextId("uStory");
  items.push(textFrame({
    storyId: editionStory,
    x: 18 * MM, y: 16 * MM,
    w: 80 * MM, h: 10 * MM,
  }));

  // Wordmark + strap + publisher (bottom-left block)
  const titleStory = nextId("uStory");
  items.push(textFrame({
    storyId: titleStory,
    x: 18 * MM, y: 198 * MM,
    w: PAGE_W - 36 * MM, h: 90 * MM,
  }));

  return {
    spread: { spreadId, pageId, items, pageName: "1" },
    stories: [
      { id: editionStory, paragraphs: [
        paraRange("ParagraphStyle/Cover_Edition", [{ text: "1st Edition · 2026" }]),
      ], title: "Cover edition mark" },
      { id: titleStory, paragraphs: [
        paraRange("ParagraphStyle/Cover_Wordmark", [{ text: "The First Owner’s Reference" }]),
        paraRange("ParagraphStyle/Cover_Strap", [{ text: "An annual editorial publication for first-time superyacht buyers." }]),
        paraRange("ParagraphStyle/Cover_Publisher", [{ text: "Foreland Marine · London" }]),
      ], title: "Cover title block" },
    ],
  };
}

function buildFrontispiece(printImages) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const fpPath = path.join(IMG_SRC_DIR, printImages.frontispiece.filename);
  const items = [
    imageRect({
      x: -BLEED, y: -BLEED,
      w: PAGE_W + 2 * BLEED, h: PAGE_H + 2 * BLEED,
      imagePath: fpPath,
      fit: "fill",
      locked: true,
    }),
  ];
  return { spread: { spreadId, pageId, items, pageName: "2" }, stories: [] };
}

function buildTitlePage(sections) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];
  const stories = [];

  // Top: edition mark
  let edStory = nextId("uStory");
  items.push(textFrame({ storyId: edStory, x: M_IN, y: 30 * MM, w: 100 * MM, h: 8 * MM }));
  stories.push({ id: edStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: "1st Edition · 2026" }]),
  ], title: "Title edition" });

  // Title
  let titleStory = nextId("uStory");
  items.push(textFrame({ storyId: titleStory, x: M_IN, y: 44 * MM, w: PAGE_W - M_IN - M_OUT, h: 40 * MM }));
  stories.push({ id: titleStory, paragraphs: [
    paraRange("ParagraphStyle/Title_Page_Title", [{ text: "The First Owner’s Reference" }]),
  ], title: "Title heading" });

  // Strap
  let strapStory = nextId("uStory");
  items.push(textFrame({ storyId: strapStory, x: M_IN, y: 92 * MM, w: PAGE_W - M_IN - M_OUT - 30 * MM, h: 30 * MM }));
  stories.push({ id: strapStory, paragraphs: [
    paraRange("ParagraphStyle/Title_Page_Strap", [{ text: "An annual editorial publication on the structural, financial, and operational dimensions of first-time superyacht acquisition. Or rather, how to buy a boat." }]),
  ], title: "Title strap" });

  // Publisher's frame
  let frameLabelStory = nextId("uStory");
  items.push(textFrame({ storyId: frameLabelStory, x: M_IN, y: 138 * MM, w: 90 * MM, h: 6 * MM }));
  stories.push({ id: frameLabelStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: "The publisher’s frame" }]),
  ], title: "Frame label" });

  let frameBodyStory = nextId("uStory");
  items.push(textFrame({ storyId: frameBodyStory, x: M_IN, y: 146 * MM, w: PAGE_W - M_IN - M_OUT - 30 * MM, h: 35 * MM }));
  stories.push({ id: frameBodyStory, paragraphs: [
    paraRange("ParagraphStyle/Title_Page_Frame_Body", [{ text: "The publication is funded by an independent superyacht consultancy that holds no yard affiliations and takes no broker commissions. It is published once a year, in print and online. It carries no advertising. Sources are named in the back matter. The independence test in the closing chapter is offered for application to the publisher first." }]),
  ], title: "Frame body" });

  // Foot metadata (Publisher / Web / Edition)
  const footY = 196 * MM;
  const colW = (PAGE_W - M_IN - M_OUT) / 3;
  const footFields = [
    { label: "Publisher", value: "Foreland Marine, London" },
    { label: "Web", value: "firstownersreference.com" },
    { label: "Edition", value: "First, September 2026" },
  ];
  footFields.forEach((f, i) => {
    const s = nextId("uStory");
    items.push(textFrame({ storyId: s, x: M_IN + i * colW, y: footY, w: colW - 5 * MM, h: 16 * MM }));
    stories.push({ id: s, paragraphs: [
      paraRange("ParagraphStyle/Mono_Label", [{ text: f.label }]),
      paraRange("ParagraphStyle/Title_Page_Foot_Value", [{ text: f.value }]),
    ], title: f.label });
  });

  // Section list
  const listLabelStory = nextId("uStory");
  items.push(textFrame({ storyId: listLabelStory, x: M_IN, y: 226 * MM, w: 60 * MM, h: 6 * MM }));
  stories.push({ id: listLabelStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: "In this edition" }]),
  ], title: "Contents label" });

  // 3-column section list
  const listColW = (PAGE_W - M_IN - M_OUT) / 3 - 4 * MM;
  sections.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M_IN + col * ((PAGE_W - M_IN - M_OUT) / 3);
    const y = 234 * MM + row * 12 * MM;
    const story = nextId("uStory");
    items.push(textFrame({ storyId: story, x, y, w: listColW, h: 10 * MM }));
    stories.push({ id: story, paragraphs: [
      paraRange("ParagraphStyle/Contents_Item", [
        { style: "CharacterStyle/Mono_Number", text: String(s.number).padStart(2, "0") + "    " },
        { text: s.title },
      ]),
    ], title: `Contents ${s.number}` });
  });

  return { spread: { spreadId, pageId, items, pageName: "3" }, stories };
}

function buildChapterOpener(section, printImages) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];
  const stories = [];

  const heroPath = path.join(IMG_SRC_DIR, printImages.chapters[section.slug]?.filename || "ch01.jpg");
  items.push(imageRect({
    layer: "uLayerArt",
    x: -BLEED, y: -BLEED,
    w: PAGE_W + 2 * BLEED, h: PAGE_H + 2 * BLEED,
    imagePath: heroPath,
    fit: "fill",
    locked: true,
  }));

  // Chapter number (large, top-left over image)
  const numStory = nextId("uStory");
  items.push(textFrame({ storyId: numStory, x: 18 * MM, y: 28 * MM, w: 90 * MM, h: 18 * MM }));
  stories.push({ id: numStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label_Paper", [{ text: `Chapter ${String(section.number).padStart(2, "0")}` }]),
  ], title: `Chapter ${section.number} label` });

  // Chapter title (bottom-left block)
  const titleStory = nextId("uStory");
  items.push(textFrame({ storyId: titleStory, x: 18 * MM, y: 198 * MM, w: PAGE_W - 36 * MM, h: 50 * MM }));
  stories.push({ id: titleStory, paragraphs: [
    paraRange("ParagraphStyle/Chapter_Title_Paper", [{ text: section.title }]),
  ], title: `Chapter ${section.number} title` });

  // Standfirst
  const standStory = nextId("uStory");
  items.push(textFrame({ storyId: standStory, x: 18 * MM, y: 254 * MM, w: PAGE_W - 36 * MM - 30 * MM, h: 26 * MM }));
  stories.push({ id: standStory, paragraphs: [
    paraRange("ParagraphStyle/Chapter_Standfirst_Paper", [{ text: section.standfirst }]),
  ], title: `Chapter ${section.number} standfirst` });

  return { spread: { spreadId, pageId, items, pageName: String(section.number) + " opener" }, stories };
}

function buildChapterBody(section, essay) {
  if (!essay) return { spread: null, stories: [] };
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];
  const stories = [];

  // Title strip at top
  const titleStory = nextId("uStory");
  items.push(textFrame({ storyId: titleStory, x: M_IN, y: M_TOP, w: PAGE_W - M_IN - M_OUT, h: 26 * MM }));
  stories.push({ id: titleStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: `Chapter ${String(section.number).padStart(2, "0")} · Lead essay` }]),
    paraRange("ParagraphStyle/Body_Title", [{ text: essay.title }]),
  ], title: `Chapter ${section.number} body title` });

  // Standfirst block
  const sfStory = nextId("uStory");
  items.push(textFrame({ storyId: sfStory, x: M_IN, y: M_TOP + 30 * MM, w: PAGE_W - M_IN - M_OUT, h: 24 * MM }));
  stories.push({ id: sfStory, paragraphs: [
    paraRange("ParagraphStyle/Body_Standfirst", [{ text: essay.standfirst }]),
  ], title: `Chapter ${section.number} standfirst` });

  // Body story (overset by default - designer flows the rest)
  const bodyStory = nextId("uStory");
  const bodyY = M_TOP + 60 * MM;
  const bodyH = PAGE_H - bodyY - M_BOT;
  items.push(textFrame({
    storyId: bodyStory,
    x: M_IN, y: bodyY,
    w: PAGE_W - M_IN - M_OUT, h: bodyH,
    columns: 2,
    columnGutter: COL_GAP,
  }));

  const paragraphs = [];
  let isFirst = true;
  for (const p of essay.paragraphs) {
    if (typeof p === "string") {
      paragraphs.push(paraRange(isFirst ? "ParagraphStyle/Body_Lead" : "ParagraphStyle/Body", [{ text: p }]));
      isFirst = false;
    } else if (p.type === "h2") {
      paragraphs.push(paraRange("ParagraphStyle/Body_H2", [{ text: p.text }]));
      isFirst = true;
    } else if (p.type === "blockquote") {
      paragraphs.push(paraRange("ParagraphStyle/Body_Pullquote", [{ text: p.text, italic: true }]));
      if (p.attribution) paragraphs.push(paraRange("ParagraphStyle/Body_Pullquote_Attribution", [{ text: "— " + p.attribution }]));
      isFirst = false;
    } else if (p.type === "editorsNote") {
      paragraphs.push(paraRange("ParagraphStyle/Body_EditorsNote", [{ style: "CharacterStyle/Bold", text: "Editor’s note. " }, { text: p.text }]));
      isFirst = false;
    } else if (p.type === "figure") {
      paragraphs.push(paraRange("ParagraphStyle/Body_Caption", [{ text: p.caption || p.alt || "" }]));
    }
  }
  stories.push({ id: bodyStory, paragraphs, title: `Chapter ${section.number} body` });

  return { spread: { spreadId, pageId, items, pageName: String(section.number) + " body" }, stories };
}

function buildClosingImage(printImages) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const closingPath = path.join(IMG_SRC_DIR, printImages.closing.filename);
  const items = [
    imageRect({
      x: -BLEED, y: -BLEED,
      w: PAGE_W + 2 * BLEED, h: PAGE_H + 2 * BLEED,
      imagePath: closingPath,
      fit: "fill",
      locked: true,
    }),
  ];
  return { spread: { spreadId, pageId, items, pageName: "Closing" }, stories: [] };
}

function buildGlossary(entries) {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];
  const stories = [];

  // Heading
  const labelStory = nextId("uStory");
  items.push(textFrame({ storyId: labelStory, x: M_IN, y: M_TOP, w: 90 * MM, h: 8 * MM }));
  stories.push({ id: labelStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: "A — Reference" }]),
  ], title: "Glossary label" });

  const titleStory = nextId("uStory");
  items.push(textFrame({ storyId: titleStory, x: M_IN, y: M_TOP + 12 * MM, w: PAGE_W - M_IN - M_OUT, h: 22 * MM }));
  stories.push({ id: titleStory, paragraphs: [
    paraRange("ParagraphStyle/Title_Page_Title", [{ text: "Glossary" }]),
  ], title: "Glossary title" });

  // Body in two columns
  const bodyY = M_TOP + 42 * MM;
  const bodyH = PAGE_H - bodyY - M_BOT;
  const bodyStory = nextId("uStory");
  items.push(textFrame({
    storyId: bodyStory,
    x: M_IN, y: bodyY,
    w: PAGE_W - M_IN - M_OUT, h: bodyH,
    columns: 2,
    columnGutter: COL_GAP,
  }));

  const sorted = entries.slice().sort((a, b) => a.term.localeCompare(b.term));
  const paragraphs = [];
  for (const e of sorted) {
    paragraphs.push(paraRange("ParagraphStyle/Glossary_Entry", [
      { style: "CharacterStyle/Bold", text: e.term + ". " },
      { text: e.shortDefinition },
    ]));
  }
  stories.push({ id: bodyStory, paragraphs, title: "Glossary body" });

  return { spread: { spreadId, pageId, items, pageName: "Glossary" }, stories };
}

function buildColophon() {
  const spreadId = nextId("uSpread");
  const pageId = nextId("uPage");
  const items = [];
  const stories = [];

  const labelStory = nextId("uStory");
  items.push(textFrame({ storyId: labelStory, x: M_IN, y: M_TOP, w: 90 * MM, h: 8 * MM }));
  stories.push({ id: labelStory, paragraphs: [
    paraRange("ParagraphStyle/Mono_Label", [{ text: "D — Reference" }]),
  ], title: "Colophon label" });

  const titleStory = nextId("uStory");
  items.push(textFrame({ storyId: titleStory, x: M_IN, y: M_TOP + 12 * MM, w: PAGE_W - M_IN - M_OUT, h: 22 * MM }));
  stories.push({ id: titleStory, paragraphs: [
    paraRange("ParagraphStyle/Title_Page_Title", [{ text: "Colophon" }]),
  ], title: "Colophon title" });

  const bodyStory = nextId("uStory");
  items.push(textFrame({
    storyId: bodyStory,
    x: M_IN, y: M_TOP + 42 * MM,
    w: PAGE_W - M_IN - M_OUT, h: PAGE_H - M_TOP - 42 * MM - M_BOT,
    columns: 2,
    columnGutter: COL_GAP,
  }));
  stories.push({ id: bodyStory, paragraphs: [
    paraRange("ParagraphStyle/Body_H2", [{ text: "Type and paper" }]),
    paraRange("ParagraphStyle/Body", [{ text: "Set in Newsreader by Production Type, DM Sans and DM Mono by Indian Type Foundry. Printed on Munken Pure 120 gsm uncoated text stock with GF Smith Colorplan cover boards. Smyth-sewn, casebound. Trim 230 by 300 mm. Five hundred copies, hand-numbered." }]),
    paraRange("ParagraphStyle/Body_H2", [{ text: "Editorial principles" }]),
    paraRange("ParagraphStyle/Body", [{ text: "Published by Foreland Marine Consultancy Limited, 7 Bell Yard, London WC2A 2JR. ISSN pending. © 2026 Foreland Marine Consultancy Limited. All rights reserved. No advertising, ever. The publication holds no yard affiliations and takes no broker commissions." }]),
    paraRange("ParagraphStyle/Body", [{ text: "Editorial correspondence: editors@firstownersreference.com. The independence test that runs through this publication is applied to the publisher itself." }]),
  ], title: "Colophon body" });

  return { spread: { spreadId, pageId, items, pageName: "Colophon" }, stories };
}

// === Resource files ===

function stylesXml() {
  return pkg(
`<idPkg:Styles xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <RootCharacterStyleGroup Self="u_root_cstyle">
    <CharacterStyle Self="CharacterStyle/$ID/[No character style]" Imported="false" KeyboardShortcut="0 0" Name="$ID/[No character style]"/>
    <CharacterStyle Self="CharacterStyle/Italic" Imported="false" KeyboardShortcut="0 0" Name="Italic" FontStyle="Italic"/>
    <CharacterStyle Self="CharacterStyle/Bold" Imported="false" KeyboardShortcut="0 0" Name="Bold" FontStyle="Semibold"/>
    <CharacterStyle Self="CharacterStyle/Marine" Imported="false" KeyboardShortcut="0 0" Name="Marine" FillColor="Color/Marine"/>
    <CharacterStyle Self="CharacterStyle/Mono_Number" Imported="false" KeyboardShortcut="0 0" Name="Mono Number" FillColor="Color/Marine" PointSize="9" Tracking="80">
      <Properties>
        <AppliedFont type="string">DM Mono</AppliedFont>
      </Properties>
    </CharacterStyle>
  </RootCharacterStyleGroup>
  <RootParagraphStyleGroup Self="u_root_pstyle">
    <ParagraphStyle Self="ParagraphStyle/$ID/NormalParagraphStyle" Imported="false" Name="$ID/NormalParagraphStyle" NextStyle="ParagraphStyle/$ID/NormalParagraphStyle" KeyboardShortcut="0 0" PointSize="9.5" Leading="13" FillColor="Color/Ink">
      <Properties>
        <AppliedFont type="string">Newsreader</AppliedFont>
      </Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Body" Imported="false" Name="Body" NextStyle="ParagraphStyle/Body" PointSize="9.5" Leading="13" FirstLineIndent="11.34" Justification="LeftJustified" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle" SpaceAfter="0" SpaceBefore="0" FillColor="Color/Ink">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Lead" Imported="false" Name="Body / Lead" NextStyle="ParagraphStyle/Body" PointSize="9.5" Leading="13" FirstLineIndent="0" BasedOn="ParagraphStyle/Body" DropCapCharacters="1" DropCapLines="3" FillColor="Color/Ink">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_H2" Imported="false" Name="Body / Heading" NextStyle="ParagraphStyle/Body" PointSize="14" Leading="18" FirstLineIndent="0" FontStyle="Regular" FillColor="Color/Marine" SpaceBefore="14" SpaceAfter="4" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Title" Imported="false" Name="Body / Title" NextStyle="ParagraphStyle/Body" PointSize="28" Leading="32" FirstLineIndent="0" FontStyle="Light" FillColor="Color/Ink" SpaceBefore="6" SpaceAfter="4" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Standfirst" Imported="false" Name="Body / Standfirst" NextStyle="ParagraphStyle/Body" PointSize="14" Leading="19" FirstLineIndent="0" FontStyle="Italic" FillColor="Color/Soft" SpaceAfter="8" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Pullquote" Imported="false" Name="Body / Pull quote" NextStyle="ParagraphStyle/Body" PointSize="16" Leading="22" FirstLineIndent="0" FontStyle="Italic" FillColor="Color/Marine" SpaceBefore="10" SpaceAfter="4" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Pullquote_Attribution" Imported="false" Name="Body / Pullquote attribution" NextStyle="ParagraphStyle/Body" PointSize="9.5" Leading="13" FirstLineIndent="0" FontStyle="Italic" FillColor="Color/Stone" SpaceAfter="10" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_EditorsNote" Imported="false" Name="Body / Editor's note" NextStyle="ParagraphStyle/Body" PointSize="9.5" Leading="13" FirstLineIndent="0" FontStyle="Italic" FillColor="Color/Soft" SpaceBefore="10" SpaceAfter="6" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Body_Caption" Imported="false" Name="Body / Caption" NextStyle="ParagraphStyle/Body" PointSize="8.5" Leading="11" FirstLineIndent="0" FontStyle="Italic" FillColor="Color/Stone" SpaceAfter="6" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Mono_Label" Imported="false" Name="Mono / Label" NextStyle="ParagraphStyle/Body" PointSize="7.5" Leading="11" FirstLineIndent="0" Tracking="180" Capitalization="AllCaps" FillColor="Color/Marine" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">DM Mono</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Mono_Label_Paper" Imported="false" Name="Mono / Label (paper)" NextStyle="ParagraphStyle/Body" PointSize="9" Leading="13" FirstLineIndent="0" Tracking="200" Capitalization="AllCaps" FillColor="Color/Paper" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">DM Mono</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Cover_Edition" Imported="false" Name="Cover / Edition" NextStyle="ParagraphStyle/Body" PointSize="9" Leading="13" Tracking="220" Capitalization="AllCaps" FillColor="Color/Paper" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">DM Mono</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Cover_Wordmark" Imported="false" Name="Cover / Wordmark" NextStyle="ParagraphStyle/Cover_Strap" PointSize="64" Leading="64" FontStyle="Light" FillColor="Color/Paper" SpaceAfter="14" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Cover_Strap" Imported="false" Name="Cover / Strap" NextStyle="ParagraphStyle/Cover_Publisher" PointSize="11" Leading="16" FontStyle="Italic" FillColor="Color/Paper" SpaceAfter="14" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Cover_Publisher" Imported="false" Name="Cover / Publisher" NextStyle="ParagraphStyle/Body" PointSize="7.5" Leading="11" Tracking="220" Capitalization="AllCaps" FillColor="Color/Paper" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">DM Mono</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Title_Page_Title" Imported="false" Name="Title page / Title" NextStyle="ParagraphStyle/Title_Page_Strap" PointSize="48" Leading="52" FontStyle="Light" FillColor="Color/Ink" SpaceAfter="14" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Title_Page_Strap" Imported="false" Name="Title page / Strap" NextStyle="ParagraphStyle/Body" PointSize="14" Leading="20" FontStyle="Italic" FillColor="Color/Soft" SpaceAfter="14" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Title_Page_Frame_Body" Imported="false" Name="Title page / Frame body" NextStyle="ParagraphStyle/Body" PointSize="10" Leading="15" FontStyle="Italic" FillColor="Color/Ink" SpaceAfter="10" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Title_Page_Foot_Value" Imported="false" Name="Title page / Foot value" NextStyle="ParagraphStyle/Body" PointSize="10.5" Leading="14" FillColor="Color/Ink" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Contents_Item" Imported="false" Name="Contents / Item" NextStyle="ParagraphStyle/Contents_Item" PointSize="10.5" Leading="14" FirstLineIndent="0" FillColor="Color/Ink" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Chapter_Title_Paper" Imported="false" Name="Chapter / Title (paper)" NextStyle="ParagraphStyle/Chapter_Standfirst_Paper" PointSize="46" Leading="48" FontStyle="Light" FillColor="Color/Paper" SpaceAfter="8" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
    <ParagraphStyle Self="ParagraphStyle/Chapter_Standfirst_Paper" Imported="false" Name="Chapter / Standfirst (paper)" NextStyle="ParagraphStyle/Body" PointSize="13" Leading="18" FontStyle="Italic" FillColor="Color/Paper" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>

    <ParagraphStyle Self="ParagraphStyle/Glossary_Entry" Imported="false" Name="Glossary / Entry" NextStyle="ParagraphStyle/Glossary_Entry" PointSize="9.5" Leading="13" FirstLineIndent="0" SpaceAfter="6" FillColor="Color/Ink" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle">
      <Properties><AppliedFont type="string">Newsreader</AppliedFont></Properties>
    </ParagraphStyle>
  </RootParagraphStyleGroup>
  <RootObjectStyleGroup Self="u_root_ostyle">
    <ObjectStyle Self="ObjectStyle/$ID/[None]" Imported="false" Name="$ID/[None]" AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ObjectStyle Self="ObjectStyle/$ID/[Normal Text Frame]" Imported="false" Name="$ID/[Normal Text Frame]" AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ObjectStyle Self="ObjectStyle/$ID/[Normal Graphics Frame]" Imported="false" Name="$ID/[Normal Graphics Frame]" AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ObjectStyle Self="ObjectStyle/$ID/[Normal Grid]" Imported="false" Name="$ID/[Normal Grid]" AppliedParagraphStyle="ParagraphStyle/$ID/NormalParagraphStyle"/>
  </RootObjectStyleGroup>
  <RootTableStyleGroup Self="u_root_tstyle">
    <TableStyle Self="TableStyle/$ID/[No table style]" Imported="false" Name="$ID/[No table style]"/>
    <TableStyle Self="TableStyle/$ID/[Basic Table]" Imported="false" Name="$ID/[Basic Table]" BasedOn="TableStyle/$ID/[No table style]"/>
  </RootTableStyleGroup>
  <RootCellStyleGroup Self="u_root_cellstyle">
    <CellStyle Self="CellStyle/$ID/[None]" Imported="false" Name="$ID/[None]"/>
  </RootCellStyleGroup>
</idPkg:Styles>`,
  );
}

function fontsXml() {
  return pkg(
`<idPkg:Fonts xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <FontFamily Self="uFF_Newsreader" Name="Newsreader">
    <Font Self="uFont_Newsreader_Regular" FontFamily="Newsreader" Name="Newsreader" PostScriptName="Newsreader-Regular" Status="Unknown" FontStyleName="Regular" FontType="OpenTypeTT" WritingScript="0"/>
    <Font Self="uFont_Newsreader_Light" FontFamily="Newsreader" Name="Newsreader Light" PostScriptName="Newsreader-Light" Status="Unknown" FontStyleName="Light" FontType="OpenTypeTT" WritingScript="0"/>
    <Font Self="uFont_Newsreader_Italic" FontFamily="Newsreader" Name="Newsreader Italic" PostScriptName="Newsreader-Italic" Status="Unknown" FontStyleName="Italic" FontType="OpenTypeTT" WritingScript="0"/>
    <Font Self="uFont_Newsreader_Semibold" FontFamily="Newsreader" Name="Newsreader Semibold" PostScriptName="Newsreader-Semibold" Status="Unknown" FontStyleName="Semibold" FontType="OpenTypeTT" WritingScript="0"/>
  </FontFamily>
  <FontFamily Self="uFF_DMMono" Name="DM Mono">
    <Font Self="uFont_DMMono_Regular" FontFamily="DM Mono" Name="DM Mono" PostScriptName="DMMono-Regular" Status="Unknown" FontStyleName="Regular" FontType="OpenTypeTT" WritingScript="0"/>
  </FontFamily>
  <FontFamily Self="uFF_DMSans" Name="DM Sans">
    <Font Self="uFont_DMSans_Regular" FontFamily="DM Sans" Name="DM Sans" PostScriptName="DMSans-Regular" Status="Unknown" FontStyleName="Regular" FontType="OpenTypeTT" WritingScript="0"/>
  </FontFamily>
</idPkg:Fonts>`,
  );
}

function graphicXml() {
  return pkg(
`<idPkg:Graphic xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Color Self="Color/Black" Model="Process" Space="CMYK" ColorValue="0 0 0 100" ColorOverride="Specialblack" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Black" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Paper" Model="Process" Space="CMYK" ColorValue="2 3 7 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Paper" ColorEditable="true" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Registration" Model="Registration" Space="CMYK" ColorValue="100 100 100 100" ColorOverride="SpecialRegistration" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Registration" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Cyan" Model="Process" Space="CMYK" ColorValue="100 0 0 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Cyan" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Magenta" Model="Process" Space="CMYK" ColorValue="0 100 0 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Magenta" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Yellow" Model="Process" Space="CMYK" ColorValue="0 0 100 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Yellow" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Marine" Model="Process" Space="CMYK" ColorValue="92 60 27 30" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Marine" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Marine_Deep" Model="Process" Space="CMYK" ColorValue="95 75 45 50" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Marine Deep" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Sail" Model="Process" Space="CMYK" ColorValue="65 35 15 10" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Sail" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Ink" Model="Process" Space="CMYK" ColorValue="60 50 50 90" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Ink" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Soft" Model="Process" Space="CMYK" ColorValue="40 30 30 70" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Soft" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Stone" Model="Process" Space="CMYK" ColorValue="25 25 35 50" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Stone" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Rule" Model="Process" Space="CMYK" ColorValue="10 12 20 20" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Rule" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <StrokeStyle Self="StrokeStyle/$ID/Solid" Name="$ID/Solid"/>
  <Swatch Self="Swatch/None" Name="None" ColorEditable="false" ColorRemovable="false" Visible="true"/>
</idPkg:Graphic>`,
  );
}

function preferencesXml(pageCount) {
  return pkg(
`<idPkg:Preferences xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <DocumentPreference PageHeight="${fmt(PAGE_H)}" PageWidth="${fmt(PAGE_W)}" PageOrientation="Portrait" PagesPerDocument="${pageCount}" FacingPages="false" DocumentBleedTopOffset="${fmt(BLEED)}" DocumentBleedBottomOffset="${fmt(BLEED)}" DocumentBleedInsideOrLeftOffset="${fmt(BLEED)}" DocumentBleedOutsideOrRightOffset="${fmt(BLEED)}" SlugTopOffset="0" SlugBottomOffset="0" SlugInsideOrLeftOffset="0" SlugRightOrOutsideOffset="0" DocumentBleedUniformSize="true" DocumentSlugUniformSize="true" ColumnDirection="Horizontal" ColumnGuideLocked="false" PreserveLayoutWhenShuffling="true" AllowPageShuffle="true" IntentList="PrintIntent"/>
  <MarginPreference ColumnCount="2" ColumnGutter="${fmt(COL_GAP)}" Top="${fmt(M_TOP)}" Bottom="${fmt(M_BOT)}" Left="${fmt(M_IN)}" Right="${fmt(M_OUT)}" ColumnDirection="Horizontal"/>
  <TextDefault AppliedLanguage="$ID/English: USA" PointSize="9.5" Leading="13">
    <Properties>
      <AppliedFont type="string">Newsreader</AppliedFont>
    </Properties>
  </TextDefault>
  <ViewPreference HorizontalMeasurementUnits="Millimeters" VerticalMeasurementUnits="Millimeters" RulerOrigin="SpreadOrigin" CursorKeyDistance="2.834645" PointsPerInch="72" ShowRulers="true" ShowCompletePDF="true"/>
  <TransparencyPreference ChannelGenerationMode="Pages"/>
  <LinkingPreference DefaultRelinkFolder=""/>
  <ConditionalTextPreference ActiveConditionSet="n" ShowConditionIndicators="ShowIndicators"/>
  <Layer Self="uLayerArt" Name="Art" Visible="true" Locked="false" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" LayerColor="LightGray"/>
  <Layer Self="uLayerText" Name="Text" Visible="true" Locked="false" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" LayerColor="LightBlue"/>
</idPkg:Preferences>`,
  );
}

function masterSpreadXml() {
  return pkg(
`<idPkg:MasterSpread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <MasterSpread Self="uMaster" Name="A-Master" NamePrefix="A" BaseName="Master" ShowMasterItems="true" PageCount="1" OverriddenPageItemProps="" ItemTransform="1 0 0 1 0 0">
    <Page Self="uMasterPage" Name="A" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="${fmt(-PAGE_H/2)} ${fmt(-PAGE_W/2)} ${fmt(PAGE_H/2)} ${fmt(PAGE_W/2)}" ItemTransform="1 0 0 1 0 0">
      <Properties>
        <Descriptor type="list">
          <ListItem type="string">$ID/</ListItem>
          <ListItem type="enumeration">Arabic</ListItem>
          <ListItem type="boolean">true</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="long">1</ListItem>
          <ListItem type="string"></ListItem>
          <ListItem type="long">0</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="boolean">false</ListItem>
          <ListItem type="boolean">true</ListItem>
          <ListItem type="boolean">false</ListItem>
        </Descriptor>
        <PageColor type="enumeration">UseMasterColor</PageColor>
      </Properties>
      <MarginPreference ColumnCount="2" ColumnGutter="${fmt(COL_GAP)}" Top="${fmt(M_TOP)}" Bottom="${fmt(M_BOT)}" Left="${fmt(M_IN)}" Right="${fmt(M_OUT)}" ColumnDirection="Horizontal"/>
    </Page>
  </MasterSpread>
</idPkg:MasterSpread>`,
  );
}

function backingStoryXml() {
  return pkg(
`<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Story Self="uBackingStory" UserText="true" IsEndnoteStory="false">
    <StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection"/>
    <InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false"/>
    <XmlStory Self="uXmlStory" AppliedXMLElement="n">
      <Properties>
        <RootXMLElement type="object">uRootXmlElement</RootXMLElement>
      </Properties>
      <XMLElement Self="uRootXmlElement" MarkupTag="XMLTag/Root" XMLContent="uXmlStory"/>
    </XmlStory>
  </Story>
</idPkg:Story>`,
  );
}

function tagsXml() {
  return pkg(
`<idPkg:Tags xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <XMLTag Self="XMLTag/Root" Name="Root">
    <Properties>
      <TagColor type="enumeration">LightBlue</TagColor>
    </Properties>
  </XMLTag>
</idPkg:Tags>`,
  );
}

function containerXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
  <rootfiles>
    <rootfile full-path="designmap.xml" media-type="application/vnd.adobe.indesign-idml-package"/>
  </rootfiles>
</container>`;
}

function designmapXml(spreadIds, storyIds) {
  const spreads = spreadIds.map((id) => `  <idPkg:Spread src="Spreads/Spread_${id}.xml"/>`).join("\n");
  const stories = storyIds.map((id) => `  <idPkg:Story src="Stories/Story_${id}.xml"/>`).join("\n");
  return XML_HEADER +
`<?aid SnippetType="InCopyInterchange"?>
<Document xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0" Self="uDoc" StoryList="${storyIds.join(" ")}" Name="firstownersreference.idml" ZeroPoint="0 0" ActiveLayer="uLayerText" CMYKProfile="U.S. Web Coated (SWOP) v2" RGBProfile="sRGB IEC61966-2.1" SolidColorIntent="UseColorSettings" AfterBlendingIntent="UseColorSettings" DefaultImageIntent="UseColorSettings" RGBPolicy="PreserveEmbeddedProfiles" CMYKPolicy="PreserveNumbers">
  <Language Self="Language/$ID/English: USA" Name="$ID/English: USA" SingleQuotes="‘’" DoubleQuotes="“”" PrimaryLanguageName="$ID/English: USA" SublanguageName="$ID/USA" Id="1033" HyphenationVendor="Proximity" SpellingVendor="Proximity"/>
  <idPkg:Graphic src="Resources/Graphic.xml"/>
  <idPkg:Fonts src="Resources/Fonts.xml"/>
  <idPkg:Styles src="Resources/Styles.xml"/>
  <idPkg:Preferences src="Resources/Preferences.xml"/>
  <idPkg:MasterSpread src="MasterSpreads/MasterSpread_uMaster.xml"/>
${spreads}
${stories}
  <idPkg:BackingStory src="XML/BackingStory.xml"/>
  <idPkg:Tags src="XML/Tags.xml"/>
</Document>`;
}

// === Main ===

async function main() {
  log("Loading content from lib/...");
  const { sections, leadEssays, glossaryEntries, printImages } = await loadContent();

  log(`Sections: ${sections.length}, glossary entries: ${glossaryEntries.length}`);

  fs.mkdirSync(WORK_DIR, { recursive: true });

  const builds = [];
  builds.push({ ...buildCover(printImages), name: "Cover" });
  builds.push({ ...buildFrontispiece(printImages), name: "Frontispiece" });
  builds.push({ ...buildTitlePage(sections), name: "Title page" });

  for (const section of sections) {
    builds.push({ ...buildChapterOpener(section, printImages), name: `Ch ${section.number} opener` });
    const essay = leadEssays[section.slug];
    const body = buildChapterBody(section, essay);
    if (body.spread) builds.push({ ...body, name: `Ch ${section.number} body` });
  }

  builds.push({ ...buildClosingImage(printImages), name: "Closing" });
  builds.push({ ...buildGlossary(glossaryEntries), name: "Glossary" });
  builds.push({ ...buildColophon(), name: "Colophon" });

  // Write spreads and stories
  const spreadIds = [];
  const storyIds = [];
  for (const b of builds) {
    if (!b.spread) continue;
    const { spreadId, pageId, items, pageName } = b.spread;
    writeFile(`Spreads/Spread_${spreadId}.xml`, spreadXml({ spreadId, pageId, items, pageName }));
    spreadIds.push(spreadId);
    for (const s of b.stories) {
      writeFile(`Stories/Story_${s.id}.xml`, storyXml(s.id, s.paragraphs, { title: s.title }));
      storyIds.push(s.id);
    }
  }

  writeFile("mimetype", "application/vnd.adobe.indesign-idml-package");
  writeFile("META-INF/container.xml", containerXml());
  writeFile("Resources/Fonts.xml", fontsXml());
  writeFile("Resources/Styles.xml", stylesXml());
  writeFile("Resources/Graphic.xml", graphicXml());
  writeFile("Resources/Preferences.xml", preferencesXml(spreadIds.length));
  writeFile("MasterSpreads/MasterSpread_uMaster.xml", masterSpreadXml());
  writeFile("XML/BackingStory.xml", backingStoryXml());
  writeFile("XML/Tags.xml", tagsXml());
  writeFile("designmap.xml", designmapXml(spreadIds, storyIds));

  log(`Zipping IDML: ${spreadIds.length} spreads, ${storyIds.length} stories...`);
  if (fs.existsSync(OUT_FILE)) fs.unlinkSync(OUT_FILE);
  execSync(`cd "${WORK_DIR}" && zip -X0 "${OUT_FILE}" mimetype`, { stdio: "pipe" });
  execSync(`cd "${WORK_DIR}" && zip -rXD "${OUT_FILE}" . -x mimetype`, { stdio: "pipe" });

  const sizeKB = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`Wrote ${OUT_FILE} (${sizeKB} KB)`);

  fs.rmSync(WORK_DIR, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

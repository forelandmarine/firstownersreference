#!/usr/bin/env node
/*
  Build an editable .idml whose pages are the proof PDF placed as
  locked background images, with editable text-frame overlays on a
  top layer. Visually identical to the proof; designer edits text by
  clicking into the overlay frames, which have a paper-colour fill
  that hides the rendered text beneath.

  Input:  ~/Desktop/firstownersreference-1st-edition-proof-CMYK.pdf
  Output: ~/Desktop/firstownersreference.idml
          ~/Desktop/firstownersreference-pages/page-NNN.jpg  (one per PDF page)

  The IDML links the JPEGs by absolute file:// URI. Keep both files
  in ~/Desktop/ or relink in InDesign when you move them.
*/

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

const HOME = os.homedir();
const PDF_PATH = path.join(HOME, "Desktop", "firstownersreference-1st-edition-proof-CMYK.pdf");
const OUT_FILE = path.join(HOME, "Desktop", "firstownersreference.idml");
const IMG_DIR  = path.join(HOME, "Desktop", "firstownersreference-pages");
const WORK_DIR = path.join(os.tmpdir(), `idml-build-${Date.now()}`);

const DPI = 200;
const JPEG_QUALITY = 78;

const PAGE_W = 230 * 72 / 25.4;   // 651.9685 pt
const PAGE_H = 300 * 72 / 25.4;   // 850.3937 pt
const MARGIN = 22 * 72 / 25.4;    // body inset for overlay text frame

const log = (m) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`);

const XML_HEADER =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
  `<?aid style="50" type="document" readerVersion="6.0" featureSet="257" product="9.0(105)" ?>\n`;

function pkg(inner) { return XML_HEADER + inner; }

function getPdfPageCount() {
  const out = execSync(`mdls -name kMDItemNumberOfPages "${PDF_PATH}"`).toString();
  const m = out.match(/=\s*(\d+)/);
  if (!m) throw new Error("Could not read PDF page count");
  return parseInt(m[1], 10);
}

function rasterizePdf(pageCount) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  // Skip rasterization if all pages already exist and PDF mtime is older
  const pdfMtime = fs.statSync(PDF_PATH).mtimeMs;
  let allFresh = true;
  for (let i = 1; i <= pageCount; i++) {
    const p = path.join(IMG_DIR, `page-${String(i).padStart(3, "0")}.jpg`);
    if (!fs.existsSync(p) || fs.statSync(p).mtimeMs < pdfMtime) {
      allFresh = false;
      break;
    }
  }
  if (allFresh) {
    log(`Reusing existing rasterized pages in ${IMG_DIR}`);
    return;
  }
  log(`Rasterizing ${pageCount} PDF pages at ${DPI} dpi (this takes a minute)...`);
  for (const f of fs.readdirSync(IMG_DIR)) {
    if (f.startsWith("page-") && f.endsWith(".jpg")) fs.unlinkSync(path.join(IMG_DIR, f));
  }
  execSync(
    `pdftoppm -jpeg -r ${DPI} -jpegopt quality=${JPEG_QUALITY},progressive=y -aa yes -aaVector yes "${PDF_PATH}" "${path.join(IMG_DIR, "page")}"`,
    { stdio: "inherit" }
  );
}

function writeFile(rel, content) {
  const full = path.join(WORK_DIR, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function escAttr(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]),
  );
}

function spreadXml({ idx, pageImagePath, imagePixelW, imagePixelH }) {
  const spreadId = `uSpread${idx}`;
  const pageId = `uPage${idx}`;
  const rectId = `uRect${idx}`;
  const imgId  = `uImg${idx}`;
  const linkId = `uLink${idx}`;
  const tfId   = `uTF${idx}`;
  const storyId = `uStory${idx}`;

  // Image native size in points (200 dpi → 72/200 pt per px)
  const ptPerPx = 72 / DPI;
  const imgNativeW = imagePixelW * ptPerPx;
  const imgNativeH = imagePixelH * ptPerPx;

  // Rectangle covers the full page (in page-local coords: 0..W, 0..H).
  // Spread-local coords: page is centered, so page top-left = (-W/2, -H/2).
  const rectX = -PAGE_W / 2;
  const rectY = -PAGE_H / 2;

  // The image's own transform places its native-size content so that it
  // exactly covers the rectangle. We scale by PAGE_W/imgNativeW and
  // translate to the rectangle origin.
  const scaleX = PAGE_W / imgNativeW;
  const scaleY = PAGE_H / imgNativeH;

  // Body overlay text frame: inside margins.
  const tfL = -PAGE_W / 2 + MARGIN;
  const tfT = -PAGE_H / 2 + MARGIN;
  const tfR =  PAGE_W / 2 - MARGIN;
  const tfB =  PAGE_H / 2 - MARGIN;
  const tfW = tfR - tfL;
  const tfH = tfB - tfT;

  const fileURI = "file://" + encodeURI(pageImagePath).replace(/'/g, "%27");

  return pkg(
`<idPkg:Spread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Spread Self="${spreadId}" PageCount="1" BindingLocation="0" AllowPageShuffle="true" ItemTransform="1 0 0 1 0 0" ShowMasterItems="true" PageTransitionType="None" PageTransitionDirection="NotApplicable" PageTransitionDuration="Medium" FlattenerOverride="Default">
    <FlattenerPreference LineArtAndTextResolution="300" GradientAndMeshResolution="150" ClipComplexRegions="false" ConvertAllStrokesToOutlines="false" ConvertAllTextToOutlines="false">
      <Properties>
        <RasterVectorBalance type="double">50</RasterVectorBalance>
      </Properties>
    </FlattenerPreference>
    <Page Self="${pageId}" Name="${idx}" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="${rectY} ${rectX} ${rectY + PAGE_H} ${rectX + PAGE_W}" ItemTransform="1 0 0 1 0 0" AppliedMaster="n">
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
      <MarginPreference ColumnCount="1" ColumnGutter="0" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal" ColumnsPositions="0 ${PAGE_W - 2 * MARGIN}"/>
      <GridDataInformation FontStyle="Regular" PointSize="12" CharacterAki="0" LineAki="9" HorizontalScale="100" VerticalScale="100" LineAlignment="LeftOrTopLineJustify" GridAlignment="AlignEmCenter" CharacterAlignment="AlignEmCenter">
        <Properties>
          <AppliedFont type="string">Minion Pro</AppliedFont>
        </Properties>
      </GridDataInformation>
    </Page>
    <Rectangle Self="${rectId}" StoryTitle="$ID/" ContentType="GraphicType" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0" GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0" ItemLayer="uLayerProof" Locked="true" LocalDisplaySetting="Default" GradientFillHiliteLength="0" GradientFillHiliteAngle="0" GradientStrokeHiliteLength="0" GradientStrokeHiliteAngle="0" AppliedObjectStyle="ObjectStyle/$ID/[Normal Graphics Frame]" Visible="true" Name="$ID/" HorizontalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" VerticalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" ItemTransform="1 0 0 1 ${rectX} ${rectY}" FillColor="Color/Paper" StrokeColor="Swatch/None" StrokeWeight="0">
      <Properties>
        <PathGeometry>
          <GeometryPathType PathOpen="false">
            <PathPointArray>
              <PathPointType Anchor="0 0" LeftDirection="0 0" RightDirection="0 0"/>
              <PathPointType Anchor="0 ${PAGE_H}" LeftDirection="0 ${PAGE_H}" RightDirection="0 ${PAGE_H}"/>
              <PathPointType Anchor="${PAGE_W} ${PAGE_H}" LeftDirection="${PAGE_W} ${PAGE_H}" RightDirection="${PAGE_W} ${PAGE_H}"/>
              <PathPointType Anchor="${PAGE_W} 0" LeftDirection="${PAGE_W} 0" RightDirection="${PAGE_W} 0"/>
            </PathPointArray>
          </GeometryPathType>
        </PathGeometry>
      </Properties>
      <Image Self="${imgId}" Visible="true" Name="$ID/" ItemLayer="uLayerProof" Locked="false" LocalDisplaySetting="Default" ImageRenderingIntent="UseColorSettings" GrayVectorPolicy="UseEmbeddedProfile" CMYKVectorPolicy="UseEmbeddedProfile" ImageTypeName="$ID/JPEG" ActualPpi="${DPI} ${DPI}" EffectivePpi="${Math.round(DPI / scaleX)} ${Math.round(DPI / scaleY)}" ItemTransform="${scaleX} 0 0 ${scaleY} 0 0">
        <Properties>
          <Profile type="string">$ID/Embedded</Profile>
          <GraphicBounds Left="0" Top="0" Right="${imgNativeW}" Bottom="${imgNativeH}"/>
        </Properties>
        <Link Self="${linkId}" AssetURL="$ID/" AssetID="$ID/" LinkResourceURI="${escAttr(fileURI)}" LinkResourceFormat="$ID/JPEG" StoredState="Normal" LinkClassID="35906" LinkClientID="257" LinkResourceModified="false" LinkObjectModified="false" ShowInUI="true" CanEmbed="true" CanUnembed="true" CanPackage="true" ImportPolicy="NoAutoImport" ExportPolicy="NoAutoExport"/>
      </Image>
    </Rectangle>
    <TextFrame Self="${tfId}" ParentStory="${storyId}" PreviousTextFrame="n" NextTextFrame="n" ContentType="TextType" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0" GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0" ItemLayer="uLayerEdits" Locked="false" LocalDisplaySetting="Default" GradientFillHiliteLength="0" GradientFillHiliteAngle="0" GradientStrokeHiliteLength="0" GradientStrokeHiliteAngle="0" AppliedObjectStyle="ObjectStyle/$ID/[Normal Text Frame]" Visible="true" Name="$ID/" HorizontalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" VerticalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" ItemTransform="1 0 0 1 ${tfL} ${tfT}" FillColor="Swatch/None" StrokeColor="Swatch/None">
      <Properties>
        <PathGeometry>
          <GeometryPathType PathOpen="false">
            <PathPointArray>
              <PathPointType Anchor="0 0" LeftDirection="0 0" RightDirection="0 0"/>
              <PathPointType Anchor="0 ${tfH}" LeftDirection="0 ${tfH}" RightDirection="0 ${tfH}"/>
              <PathPointType Anchor="${tfW} ${tfH}" LeftDirection="${tfW} ${tfH}" RightDirection="${tfW} ${tfH}"/>
              <PathPointType Anchor="${tfW} 0" LeftDirection="${tfW} 0" RightDirection="${tfW} 0"/>
            </PathPointArray>
          </GeometryPathType>
        </PathGeometry>
        <TextFramePreference TextColumnCount="1" TextColumnGutter="0" TextColumnFixedWidth="${tfW}">
          <Properties>
            <InsetSpacing type="list">
              <ListItem type="unit">0</ListItem>
              <ListItem type="unit">0</ListItem>
              <ListItem type="unit">0</ListItem>
              <ListItem type="unit">0</ListItem>
            </InsetSpacing>
          </Properties>
        </TextFramePreference>
      </Properties>
    </TextFrame>
  </Spread>
</idPkg:Spread>`
  );
}

function emptyStoryXml(idx) {
  return pkg(
`<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Story Self="uStory${idx}" UserText="true" IsEndnoteStory="false" AppliedTOCStyle="n" TrackChanges="false" StoryTitle="Page ${idx}" AppliedNamedGrid="n">
    <StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection"/>
    <InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false"/>
    <ParagraphStyleRange AppliedParagraphStyle="ParagraphStyle/Body">
      <CharacterStyleRange AppliedCharacterStyle="CharacterStyle/$ID/[No character style]">
        <Content></Content>
      </CharacterStyleRange>
    </ParagraphStyleRange>
  </Story>
</idPkg:Story>`
  );
}

function masterSpreadXml() {
  return pkg(
`<idPkg:MasterSpread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <MasterSpread Self="uMaster" Name="A-Master" NamePrefix="A" BaseName="Master" ShowMasterItems="true" PageCount="1" OverriddenPageItemProps="" ItemTransform="1 0 0 1 0 0">
    <Page Self="uMasterPage" Name="A" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="${-PAGE_H/2} ${-PAGE_W/2} ${PAGE_H/2} ${PAGE_W/2}" ItemTransform="1 0 0 1 0 0">
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
      <MarginPreference ColumnCount="1" ColumnGutter="0" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal"/>
    </Page>
  </MasterSpread>
</idPkg:MasterSpread>`
  );
}

function stylesXml() {
  return pkg(
`<idPkg:Styles xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <RootCharacterStyleGroup Self="u_root_cstyle">
    <CharacterStyle Self="CharacterStyle/$ID/[No character style]" Imported="false" KeyboardShortcut="0 0" Name="$ID/[No character style]"/>
    <CharacterStyle Self="CharacterStyle/Italic" Imported="false" KeyboardShortcut="0 0" Name="Italic" FontStyle="Italic"/>
    <CharacterStyle Self="CharacterStyle/Bold" Imported="false" KeyboardShortcut="0 0" Name="Bold" FontStyle="Bold"/>
  </RootCharacterStyleGroup>
  <RootParagraphStyleGroup Self="u_root_pstyle">
    <ParagraphStyle Self="ParagraphStyle/$ID/NormalParagraphStyle" Imported="false" Name="$ID/NormalParagraphStyle" NextStyle="ParagraphStyle/$ID/NormalParagraphStyle" KeyboardShortcut="0 0" PointSize="9.5" Leading="13"/>
    <ParagraphStyle Self="ParagraphStyle/Body" Imported="false" Name="Body" NextStyle="ParagraphStyle/Body" KeyboardShortcut="0 0" PointSize="9.5" Leading="13" FirstLineIndent="11.34" Justification="LeftJustified" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Heading" Imported="false" Name="Heading" NextStyle="ParagraphStyle/Body" KeyboardShortcut="0 0" PointSize="17" Leading="22" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
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
</idPkg:Styles>`
  );
}

function fontsXml() {
  return pkg(
`<idPkg:Fonts xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <FontFamily Self="uFF_MinionPro" Name="Minion Pro">
    <Font Self="uFont_MinionPro_Regular" FontFamily="Minion Pro" Name="Minion Pro" PostScriptName="MinionPro-Regular" Status="Unknown" FontStyleName="Regular" FontType="OpenTypeCFF" WritingScript="0"/>
  </FontFamily>
</idPkg:Fonts>`
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
  <Color Self="Color/Ink" Model="Process" Space="CMYK" ColorValue="60 50 50 90" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Ink" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <StrokeStyle Self="StrokeStyle/$ID/Solid" Name="$ID/Solid"/>
  <Swatch Self="Swatch/None" Name="None" ColorEditable="false" ColorRemovable="false" Visible="true"/>
</idPkg:Graphic>`
  );
}

function preferencesXml(pageCount) {
  return pkg(
`<idPkg:Preferences xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <DocumentPreference PageHeight="${PAGE_H}" PageWidth="${PAGE_W}" PageOrientation="Portrait" PagesPerDocument="${pageCount}" FacingPages="false" DocumentBleedTopOffset="0" DocumentBleedBottomOffset="0" DocumentBleedInsideOrLeftOffset="0" DocumentBleedOutsideOrRightOffset="0" SlugTopOffset="0" SlugBottomOffset="0" SlugInsideOrLeftOffset="0" SlugRightOrOutsideOffset="0" DocumentBleedUniformSize="true" DocumentSlugUniformSize="true" ColumnDirection="Horizontal" ColumnGuideLocked="false" PreserveLayoutWhenShuffling="true" AllowPageShuffle="true" IntentList="PrintIntent"/>
  <MarginPreference ColumnCount="1" ColumnGutter="0" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal"/>
  <TextDefault AppliedLanguage="$ID/English: USA" PointSize="9.5" Leading="13">
    <Properties>
      <AppliedFont type="string">Minion Pro</AppliedFont>
    </Properties>
  </TextDefault>
  <ViewPreference HorizontalMeasurementUnits="Millimeters" VerticalMeasurementUnits="Millimeters" RulerOrigin="SpreadOrigin" CursorKeyDistance="2.834645" PointsPerInch="72" ShowRulers="true" ShowCompletePDF="true"/>
  <TransparencyPreference ChannelGenerationMode="Pages"/>
  <LinkingPreference DefaultRelinkFolder=""/>
  <ConditionalTextPreference ActiveConditionSet="n" ShowConditionIndicators="ShowIndicators"/>
  <Layer Self="uLayerProof" Name="Proof PDF" Visible="true" Locked="true" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" LayerColor="LightGray"/>
  <Layer Self="uLayerEdits" Name="Edits" Visible="true" Locked="false" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" LayerColor="LightBlue"/>
</idPkg:Preferences>`
  );
}

function designmapXml(pageCount) {
  const spreads = [];
  const stories = [];
  for (let i = 1; i <= pageCount; i++) {
    spreads.push(`  <idPkg:Spread src="Spreads/Spread_uSpread${i}.xml"/>`);
    stories.push(`  <idPkg:Story src="Stories/Story_uStory${i}.xml"/>`);
  }
  const storyList = Array.from({ length: pageCount }, (_, i) => `uStory${i + 1}`).join(" ");

  return XML_HEADER +
`<?aid SnippetType="InCopyInterchange"?>
<Document xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0" Self="uDoc" StoryList="${storyList}" Name="firstownersreference.idml" ZeroPoint="0 0" ActiveLayer="uLayerEdits" CMYKProfile="U.S. Web Coated (SWOP) v2" RGBProfile="sRGB IEC61966-2.1" SolidColorIntent="UseColorSettings" AfterBlendingIntent="UseColorSettings" DefaultImageIntent="UseColorSettings" RGBPolicy="PreserveEmbeddedProfiles" CMYKPolicy="PreserveNumbers">
  <Language Self="Language/$ID/English: USA" Name="$ID/English: USA" SingleQuotes="‘’" DoubleQuotes="“”" PrimaryLanguageName="$ID/English: USA" SublanguageName="$ID/USA" Id="1033" HyphenationVendor="Proximity" SpellingVendor="Proximity"/>
  <idPkg:Graphic src="Resources/Graphic.xml"/>
  <idPkg:Fonts src="Resources/Fonts.xml"/>
  <idPkg:Styles src="Resources/Styles.xml"/>
  <idPkg:Preferences src="Resources/Preferences.xml"/>
  <idPkg:MasterSpread src="MasterSpreads/MasterSpread_uMaster.xml"/>
${spreads.join("\n")}
${stories.join("\n")}
  <idPkg:BackingStory src="XML/BackingStory.xml"/>
  <idPkg:Tags src="XML/Tags.xml"/>
</Document>`;
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
</idPkg:Story>`
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
</idPkg:Tags>`
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

function getJpegSize(jpgPath) {
  // Read JPEG dimensions by scanning markers.
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

function main() {
  if (!fs.existsSync(PDF_PATH)) {
    throw new Error(`Proof PDF not found: ${PDF_PATH}`);
  }

  const pageCount = getPdfPageCount();
  log(`Proof PDF: ${pageCount} pages`);

  rasterizePdf(pageCount);

  fs.mkdirSync(WORK_DIR, { recursive: true });

  log("Generating IDML XML...");
  for (let i = 1; i <= pageCount; i++) {
    const jpg = path.join(IMG_DIR, `page-${String(i).padStart(3, "0")}.jpg`);
    if (!fs.existsSync(jpg)) throw new Error("Missing rasterized page: " + jpg);
    const { width, height } = getJpegSize(jpg);
    writeFile(`Spreads/Spread_uSpread${i}.xml`,
      spreadXml({ idx: i, pageImagePath: jpg, imagePixelW: width, imagePixelH: height })
    );
    writeFile(`Stories/Story_uStory${i}.xml`, emptyStoryXml(i));
  }

  writeFile("mimetype", "application/vnd.adobe.indesign-idml-package");
  writeFile("META-INF/container.xml", containerXml());
  writeFile("designmap.xml", designmapXml(pageCount));
  writeFile("Resources/Fonts.xml", fontsXml());
  writeFile("Resources/Styles.xml", stylesXml());
  writeFile("Resources/Graphic.xml", graphicXml());
  writeFile("Resources/Preferences.xml", preferencesXml(pageCount));
  writeFile("MasterSpreads/MasterSpread_uMaster.xml", masterSpreadXml());
  writeFile("XML/BackingStory.xml", backingStoryXml());
  writeFile("XML/Tags.xml", tagsXml());

  log("Zipping IDML package...");
  if (fs.existsSync(OUT_FILE)) fs.unlinkSync(OUT_FILE);
  execSync(`cd "${WORK_DIR}" && zip -X0 "${OUT_FILE}" mimetype`, { stdio: "pipe" });
  execSync(`cd "${WORK_DIR}" && zip -rXD "${OUT_FILE}" . -x mimetype`, { stdio: "pipe" });

  const sizeKB = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`Wrote ${OUT_FILE} (${sizeKB} KB)`);
  log(`Page images in ${IMG_DIR}`);

  fs.rmSync(WORK_DIR, { recursive: true, force: true });
}

main();

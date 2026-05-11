#!/usr/bin/env node
/*
  Build a single editable .idml file from the chapter .icml fragments.

  Input:  ~/Desktop/firstownersreference-indesign/*.icml  (Pandoc output)
  Output: ~/Desktop/firstownersreference.idml

  IDML is a ZIP of XML files. InDesign opens it as a normal, editable
  document. The mimetype entry must be the first file in the ZIP and
  stored uncompressed.

  Layout: one Spread per chapter, single non-facing page, one large
  text frame holding the chapter Story. Story will be overset on open;
  designer flows additional pages from the out-port. Trim 230 x 300 mm,
  bleed 3 mm. Paragraph and character styles match the names used in
  Pandoc's ICML output so styles import cleanly.
*/

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

const ICML_DIR = path.join(os.homedir(), "Desktop", "firstownersreference-indesign");
const OUT_FILE = path.join(os.homedir(), "Desktop", "firstownersreference.idml");
const WORK_DIR = path.join(os.tmpdir(), `idml-build-${Date.now()}`);

const PAGE_W = 230 * 72 / 25.4;   // 651.9685039370079 pt
const PAGE_H = 300 * 72 / 25.4;   // 850.3937007874016 pt
const MARGIN = 24 * 72 / 25.4;    // 68.03149606299213 pt
const BLEED  = 3 * 72 / 25.4;     // 8.503937007874016 pt

const log = (m) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`);

const XML_HEADER =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
  `<?aid style="50" type="document" readerVersion="6.0" featureSet="257" product="9.0(105)" ?>\n`;

function pkgWrap(inner) {
  return XML_HEADER + inner;
}

function getIcmlFiles() {
  const files = fs.readdirSync(ICML_DIR)
    .filter((f) => f.endsWith(".icml"))
    .sort();
  return files.map((f) => ({
    name: f,
    slug: f.replace(/\.icml$/, ""),
    path: path.join(ICML_DIR, f),
  }));
}

function stripIcmlOuterRoot(xml) {
  // Pandoc's .icml is a fragment of ParagraphStyleRange elements with
  // no root element. We use it as-is inside our <Story>.
  return xml.replace(/^<\?xml[^?]*\?>\s*/i, "").trim();
}

function storyXml(storyId, icmlFragment, chapterTitle) {
  const safeTitle = chapterTitle.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]),
  );
  return pkgWrap(
`<idPkg:Story xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Story Self="${storyId}" UserText="true" IsEndnoteStory="false" AppliedTOCStyle="n" TrackChanges="false" StoryTitle="${safeTitle}" AppliedNamedGrid="n">
    <StoryPreference OpticalMarginAlignment="false" OpticalMarginSize="12" FrameType="TextFrameType" StoryOrientation="Horizontal" StoryDirection="LeftToRightDirection"/>
    <InCopyExportOption IncludeGraphicProxies="true" IncludeAllResources="false"/>
    ${icmlFragment}
  </Story>
</idPkg:Story>`
  );
}

function spreadXml(spreadId, pageId, textFrameId, storyId, isFirst) {
  // Single non-facing page. Page occupies the full spread.
  const x0 = 0, y0 = 0;
  const x1 = PAGE_W, y1 = PAGE_H;
  // Text frame inside page margins.
  const tfx0 = MARGIN, tfy0 = MARGIN;
  const tfx1 = PAGE_W - MARGIN, tfy1 = PAGE_H - MARGIN;
  return pkgWrap(
`<idPkg:Spread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Spread Self="${spreadId}" PageCount="1" BindingLocation="0" AllowPageShuffle="true" ItemTransform="1 0 0 1 0 ${isFirst ? 0 : 0}" ShowMasterItems="true" PageTransitionType="None" PageTransitionDirection="NotApplicable" PageTransitionDuration="Medium" FlattenerOverride="Default">
    <FlattenerPreference LineArtAndTextResolution="300" GradientAndMeshResolution="150" ClipComplexRegions="false" ConvertAllStrokesToOutlines="false" ConvertAllTextToOutlines="false">
      <Properties>
        <RasterVectorBalance type="double">50</RasterVectorBalance>
      </Properties>
    </FlattenerPreference>
    <Page Self="${pageId}" Name="${pageId}" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="${y0} ${x0} ${y1} ${x1}" ItemTransform="1 0 0 1 ${-PAGE_W/2} ${-PAGE_H/2}" AppliedMaster="MasterSpread/uMaster">
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
      <MarginPreference ColumnCount="2" ColumnGutter="${9 * 72 / 25.4}" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal" ColumnsPositions="0 ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2} ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2 + 9*72/25.4} ${PAGE_W - 2*MARGIN}"/>
      <GridDataInformation FontStyle="Regular" PointSize="12" CharacterAki="0" LineAki="9" HorizontalScale="100" VerticalScale="100" LineAlignment="LeftOrTopLineJustify" GridAlignment="AlignEmCenter" CharacterAlignment="AlignEmCenter">
        <Properties>
          <AppliedFont type="string">Minion Pro</AppliedFont>
        </Properties>
      </GridDataInformation>
    </Page>
    <TextFrame Self="${textFrameId}" ParentStory="${storyId}" PreviousTextFrame="n" NextTextFrame="n" ContentType="TextType" GradientFillStart="0 0" GradientFillLength="0" GradientFillAngle="0" GradientStrokeStart="0 0" GradientStrokeLength="0" GradientStrokeAngle="0" ItemLayer="ulayer" Locked="false" LocalDisplaySetting="Default" GradientFillHiliteLength="0" GradientFillHiliteAngle="0" GradientStrokeHiliteLength="0" GradientStrokeHiliteAngle="0" AppliedObjectStyle="ObjectStyle/$ID/[Normal Text Frame]" Visible="true" Name="$ID/" HorizontalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" VerticalLayoutConstraints="FlexibleDimension FixedDimension FlexibleDimension" ItemTransform="1 0 0 1 ${tfx0 - PAGE_W/2} ${tfy0 - PAGE_H/2}">
      <Properties>
        <PathGeometry>
          <GeometryPathType PathOpen="false">
            <PathPointArray>
              <PathPointType Anchor="0 0" LeftDirection="0 0" RightDirection="0 0"/>
              <PathPointType Anchor="0 ${tfy1 - tfy0}" LeftDirection="0 ${tfy1 - tfy0}" RightDirection="0 ${tfy1 - tfy0}"/>
              <PathPointType Anchor="${tfx1 - tfx0} ${tfy1 - tfy0}" LeftDirection="${tfx1 - tfx0} ${tfy1 - tfy0}" RightDirection="${tfx1 - tfx0} ${tfy1 - tfy0}"/>
              <PathPointType Anchor="${tfx1 - tfx0} 0" LeftDirection="${tfx1 - tfx0} 0" RightDirection="${tfx1 - tfx0} 0"/>
            </PathPointArray>
          </GeometryPathType>
        </PathGeometry>
        <TextFramePreference TextColumnCount="2" TextColumnGutter="${9 * 72 / 25.4}" TextColumnFixedWidth="${(tfx1 - tfx0 - 9*72/25.4)/2}">
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

function masterSpreadXml() {
  return pkgWrap(
`<idPkg:MasterSpread xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <MasterSpread Self="uMaster" Name="A-Master" NamePrefix="A" BaseName="Master" ShowMasterItems="true" PageCount="1" OverriddenPageItemProps="" ItemTransform="1 0 0 1 0 0">
    <Page Self="uMasterPage" Name="A" AppliedTrapPreset="TrapPreset/$ID/kDefaultTrapStyleName" OverrideList="" TabOrder="" GridStartingPoint="TopOutside" UseMasterGrid="true" MasterPageTransform="1 0 0 1 0 0" GeometricBounds="0 0 ${PAGE_H} ${PAGE_W}" ItemTransform="1 0 0 1 ${-PAGE_W/2} ${-PAGE_H/2}">
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
      <MarginPreference ColumnCount="2" ColumnGutter="${9 * 72 / 25.4}" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal" ColumnsPositions="0 ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2} ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2 + 9*72/25.4} ${PAGE_W - 2*MARGIN}"/>
      <GridDataInformation FontStyle="Regular" PointSize="12" CharacterAki="0" LineAki="9" HorizontalScale="100" VerticalScale="100" LineAlignment="LeftOrTopLineJustify" GridAlignment="AlignEmCenter" CharacterAlignment="AlignEmCenter">
        <Properties>
          <AppliedFont type="string">Minion Pro</AppliedFont>
        </Properties>
      </GridDataInformation>
    </Page>
  </MasterSpread>
</idPkg:MasterSpread>`
  );
}

function stylesXml() {
  return pkgWrap(
`<idPkg:Styles xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <RootCharacterStyleGroup Self="u_root_cstyle">
    <CharacterStyle Self="CharacterStyle/$ID/[No character style]" Imported="false" KeyboardShortcut="0 0" Name="$ID/[No character style]"/>
    <CharacterStyle Self="CharacterStyle/Italic" Imported="false" KeyboardShortcut="0 0" Name="Italic" FontStyle="Italic"/>
    <CharacterStyle Self="CharacterStyle/Bold" Imported="false" KeyboardShortcut="0 0" Name="Bold" FontStyle="Bold"/>
  </RootCharacterStyleGroup>
  <RootParagraphStyleGroup Self="u_root_pstyle">
    <ParagraphStyle Self="ParagraphStyle/$ID/NormalParagraphStyle" Imported="false" Name="$ID/NormalParagraphStyle" NextStyle="ParagraphStyle/$ID/NormalParagraphStyle" KeyboardShortcut="0 0" PointSize="12" Leading="14"/>
    <ParagraphStyle Self="ParagraphStyle/Paragraph" Imported="false" Name="Paragraph" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="9.5" Leading="13" FirstLineIndent="11.34" Justification="LeftJustified" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Header1" Imported="false" Name="Header1" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="32" Leading="35" FontStyle="Light" SpaceBefore="18" SpaceAfter="9" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Header2" Imported="false" Name="Header2" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="17" Leading="22" SpaceBefore="16" SpaceAfter="6" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Header3" Imported="false" Name="Header3" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="14" Leading="19" SpaceBefore="14" SpaceAfter="4" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Header4" Imported="false" Name="Header4" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="11.5" Leading="15" SpaceBefore="10" SpaceAfter="3" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Block_20_Text" Imported="false" Name="Block Text" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="11" Leading="16" FontStyle="Italic" LeftIndent="20" RightIndent="20" SpaceBefore="9" SpaceAfter="9" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Footer" Imported="false" Name="Footer" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="9" Leading="12" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/Blockquote_20__3e__20_Paragraph" Imported="false" Name="Blockquote &gt; Paragraph" NextStyle="ParagraphStyle/Blockquote_20__3e__20_Paragraph" KeyboardShortcut="0 0" PointSize="10" Leading="15" FontStyle="Italic" LeftIndent="20" SpaceBefore="6" SpaceAfter="6" BasedOn="ParagraphStyle/Paragraph"/>
    <ParagraphStyle Self="ParagraphStyle/TableCaption" Imported="false" Name="TableCaption" NextStyle="ParagraphStyle/Paragraph" KeyboardShortcut="0 0" PointSize="9.5" Leading="13" FontStyle="Italic" SpaceAfter="3" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/TablePar" Imported="false" Name="TablePar" NextStyle="ParagraphStyle/TablePar" KeyboardShortcut="0 0" PointSize="9" Leading="12" BasedOn="ParagraphStyle/$ID/NormalParagraphStyle"/>
    <ParagraphStyle Self="ParagraphStyle/TablePar_20__3e__20_TableHeader" Imported="false" Name="TablePar &gt; TableHeader" NextStyle="ParagraphStyle/TablePar" KeyboardShortcut="0 0" PointSize="9" Leading="12" FontStyle="Bold" BasedOn="ParagraphStyle/TablePar"/>
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
    <TableStyle Self="TableStyle/Table" Imported="false" Name="Table" BasedOn="TableStyle/$ID/[Basic Table]"/>
  </RootTableStyleGroup>
  <RootCellStyleGroup Self="u_root_cellstyle">
    <CellStyle Self="CellStyle/$ID/[None]" Imported="false" Name="$ID/[None]"/>
    <CellStyle Self="CellStyle/Cell" Imported="false" Name="Cell" BasedOn="CellStyle/$ID/[None]"/>
  </RootCellStyleGroup>
</idPkg:Styles>`
  );
}

function fontsXml() {
  return pkgWrap(
`<idPkg:Fonts xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <FontFamily Self="uFF_MinionPro" Name="Minion Pro">
    <Font Self="uFont_MinionPro_Regular" FontFamily="Minion Pro" Name="Minion Pro" PostScriptName="MinionPro-Regular" Status="Unknown" FontStyleName="Regular" FontType="OpenTypeCFF" WritingScript="0"/>
    <Font Self="uFont_MinionPro_Italic" FontFamily="Minion Pro" Name="Minion Pro Italic" PostScriptName="MinionPro-It" Status="Unknown" FontStyleName="Italic" FontType="OpenTypeCFF" WritingScript="0"/>
    <Font Self="uFont_MinionPro_Bold" FontFamily="Minion Pro" Name="Minion Pro Bold" PostScriptName="MinionPro-Bold" Status="Unknown" FontStyleName="Bold" FontType="OpenTypeCFF" WritingScript="0"/>
  </FontFamily>
</idPkg:Fonts>`
  );
}

function graphicXml() {
  return pkgWrap(
`<idPkg:Graphic xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <Color Self="Color/Black" Model="Process" Space="CMYK" ColorValue="0 0 0 100" ColorOverride="Specialblack" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Black" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Paper" Model="Process" Space="CMYK" ColorValue="0 0 0 0" ColorOverride="SpecialPaper" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Paper" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Registration" Model="Registration" Space="CMYK" ColorValue="100 100 100 100" ColorOverride="SpecialRegistration" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Registration" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Cyan" Model="Process" Space="CMYK" ColorValue="100 0 0 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Cyan" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Magenta" Model="Process" Space="CMYK" ColorValue="0 100 0 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Magenta" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Yellow" Model="Process" Space="CMYK" ColorValue="0 0 100 0" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Yellow" ColorEditable="false" ColorRemovable="false" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Marine" Model="Process" Space="CMYK" ColorValue="92 60 27 30" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Marine" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <Color Self="Color/Ink" Model="Process" Space="CMYK" ColorValue="60 50 50 90" ColorOverride="Normal" AlternateSpace="NoAlternateColor" AlternateColorValue="" Name="Ink" ColorEditable="true" ColorRemovable="true" Visible="true" SpotInkAliasSpotColorReference="n"/>
  <StrokeStyle Self="StrokeStyle/$ID/Solid" Name="$ID/Solid"/>
</idPkg:Graphic>`
  );
}

function preferencesXml(spreadCount) {
  return pkgWrap(
`<idPkg:Preferences xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0">
  <DocumentPreference PageHeight="${PAGE_H}" PageWidth="${PAGE_W}" PageOrientation="Portrait" PagesPerDocument="${spreadCount}" FacingPages="false" DocumentBleedTopOffset="${BLEED}" DocumentBleedBottomOffset="${BLEED}" DocumentBleedInsideOrLeftOffset="${BLEED}" DocumentBleedOutsideOrRightOffset="${BLEED}" SlugTopOffset="0" SlugBottomOffset="0" SlugInsideOrLeftOffset="0" SlugRightOrOutsideOffset="0" DocumentBleedUniformSize="true" DocumentSlugUniformSize="true" ColumnDirection="Horizontal" ColumnGuideLocked="false" ColumnGuideColor="Magenta" MarginGuideColor="Magenta" PreserveLayoutWhenShuffling="true" AllowPageShuffle="true" IntentList="WebIntent" PrintIntent="True"/>
  <MarginPreference ColumnCount="2" ColumnGutter="${9 * 72 / 25.4}" Top="${MARGIN}" Bottom="${MARGIN}" Left="${MARGIN}" Right="${MARGIN}" ColumnDirection="Horizontal" ColumnsPositions="0 ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2} ${(PAGE_W - 2*MARGIN - 9*72/25.4)/2 + 9*72/25.4} ${PAGE_W - 2*MARGIN}"/>
  <GridPreference HorizontalGridlineColor="LightBlue" VerticalGridlineColor="LightBlue" BaselineColor="LightBlue" BaselineStart="${MARGIN}" BaselineDivision="13" BaselineGridRelativeOption="TopOfPageBaselineGridRelativeOption" BaselineGridShown="false" GridsInBack="true" DocumentGridSnapto="false" DocumentGridShown="false" HorizontalGridSubdivision="8" VerticalGridSubdivision="8" HorizontalGridlineDivision="72" VerticalGridlineDivision="72" BaselineViewThreshold="75"/>
  <GuidePreference GuidesShown="true" GuidesLocked="false" GuidesSnapto="true" GuidesInBack="false" GuideColor="LightBlue" GuideViewThreshold="5"/>
  <TextDefault AppliedLanguage="$ID/English: USA" PointSize="9.5" Leading="13">
    <Properties>
      <AppliedFont type="string">Minion Pro</AppliedFont>
    </Properties>
  </TextDefault>
  <ViewPreference HorizontalMeasurementUnits="Millimeters" VerticalMeasurementUnits="Millimeters" RulerOrigin="SpreadOrigin" CursorKeyDistance="2.834645" PointsPerInch="72" ShowRulers="true" ShowCompletePDF="true"/>
  <TransparencyPreference ChannelGenerationMode="Pages"/>
  <LinkingPreference DefaultRelinkFolder=""/>
  <ConditionalTextPreference ActiveConditionSet="n" ShowConditionIndicators="ShowIndicators"/>
  <Layer Self="ulayer" Name="Layer 1" Visible="true" Locked="false" IgnoreWrap="false" ShowGuides="true" LockGuides="false" UI="true" Expendable="true" Printable="true" LayerColor="LightBlue"/>
</idPkg:Preferences>`
  );
}

function designmapXml(spreadIds, storyIds) {
  const spreadSrcs = spreadIds
    .map((id) => `  <idPkg:Spread src="Spreads/Spread_${id}.xml"/>`)
    .join("\n");
  const storySrcs = storyIds
    .map((id) => `  <idPkg:Story src="Stories/Story_${id}.xml"/>`)
    .join("\n");
  return XML_HEADER +
`<?aid SnippetType="InCopyInterchange"?>\n` +
`<Document xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging" DOMVersion="9.0" Self="uDoc" StoryList="${storyIds.join(' ')}" Name="firstownersreference.idml" ZeroPoint="0 0" ActiveLayer="ulayer" CMYKProfile="U.S. Web Coated (SWOP) v2" RGBProfile="sRGB IEC61966-2.1" SolidColorIntent="UseColorSettings" AfterBlendingIntent="UseColorSettings" DefaultImageIntent="UseColorSettings" RGBPolicy="PreserveEmbeddedProfiles" CMYKPolicy="PreserveNumbers">
  <Language Self="Language/$ID/English: USA" Name="$ID/English: USA" SingleQuotes="‘’" DoubleQuotes="“”" PrimaryLanguageName="$ID/English: USA" SublanguageName="$ID/USA" Id="1033" HyphenationVendor="Proximity" SpellingVendor="Proximity"/>
  <idPkg:Graphic src="Resources/Graphic.xml"/>
  <idPkg:Fonts src="Resources/Fonts.xml"/>
  <idPkg:Styles src="Resources/Styles.xml"/>
  <idPkg:Preferences src="Resources/Preferences.xml"/>
  <idPkg:MasterSpread src="MasterSpreads/MasterSpread_uMaster.xml"/>
${spreadSrcs}
${storySrcs}
  <idPkg:BackingStory src="XML/BackingStory.xml"/>
  <idPkg:Tags src="XML/Tags.xml"/>
</Document>`;
}

function backingStoryXml() {
  return pkgWrap(
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
  return pkgWrap(
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

function writeFile(rel, content) {
  const full = path.join(WORK_DIR, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function main() {
  if (!fs.existsSync(ICML_DIR)) {
    throw new Error(`ICML source directory not found: ${ICML_DIR}\nRun \`node scripts/build-indesign.mjs\` first.`);
  }

  log(`Reading ICML fragments from ${ICML_DIR}`);
  const icmls = getIcmlFiles();
  log(`Found ${icmls.length} chapter fragments`);

  fs.mkdirSync(WORK_DIR, { recursive: true });

  const spreadIds = [];
  const storyIds = [];

  // Write each chapter as its own Story + Spread
  icmls.forEach((entry, i) => {
    const storyId = `uStory${i + 1}`;
    const spreadId = `uSpread${i + 1}`;
    const pageId = `uPage${i + 1}`;
    const textFrameId = `uTF${i + 1}`;

    const icmlContent = fs.readFileSync(entry.path, "utf8");
    const fragment = stripIcmlOuterRoot(icmlContent);

    writeFile(`Stories/Story_${storyId}.xml`, storyXml(storyId, fragment, entry.slug));
    writeFile(`Spreads/Spread_${spreadId}.xml`, spreadXml(spreadId, pageId, textFrameId, storyId, i === 0));

    storyIds.push(storyId);
    spreadIds.push(spreadId);
  });

  // Shared resources
  writeFile("mimetype", "application/vnd.adobe.indesign-idml-package");
  writeFile("META-INF/container.xml", containerXml());
  writeFile("designmap.xml", designmapXml(spreadIds, storyIds));
  writeFile("Resources/Fonts.xml", fontsXml());
  writeFile("Resources/Styles.xml", stylesXml());
  writeFile("Resources/Graphic.xml", graphicXml());
  writeFile("Resources/Preferences.xml", preferencesXml(spreadIds.length));
  writeFile("MasterSpreads/MasterSpread_uMaster.xml", masterSpreadXml());
  writeFile("XML/BackingStory.xml", backingStoryXml());
  writeFile("XML/Tags.xml", tagsXml());

  log("Zipping IDML package...");
  if (fs.existsSync(OUT_FILE)) fs.unlinkSync(OUT_FILE);

  // mimetype must be stored first, uncompressed
  execSync(`cd "${WORK_DIR}" && zip -X0 "${OUT_FILE}" mimetype`, { stdio: "pipe" });
  execSync(`cd "${WORK_DIR}" && zip -rXD "${OUT_FILE}" . -x mimetype`, { stdio: "pipe" });

  const sizeKB = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
  log(`Wrote ${OUT_FILE} (${sizeKB} KB)`);

  fs.rmSync(WORK_DIR, { recursive: true, force: true });
}

main();

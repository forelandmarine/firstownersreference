/*
  Flat case artwork for the casebound 1st Edition, laid out for the
  binder: back board / spine / front board plus turn-ins, with foil and
  blind-deboss elements annotated. All dimensions are stated on the
  artwork and must be confirmed with the binder before tooling.

  Geometry (mm):
    trim page        230 x 300
    board            228 x 306   (3mm overhang top/bottom/foredge, 2mm joint setback)
    joint            8 per side
    spine            see SPINE_MM below
    turn-in          16 all round

  Spine build-up for a 152pp block on Munken Pure 120gsm (bulk 1.13):
    76 leaves x 0.136mm = 10.3mm block
    + 2 x 2.5mm boards + round-and-back allowance ~1.5mm = ~16.8mm
*/

export const dynamic = "force-static";

const SPINE_MM = 17;
const BOARD_W = 228;
const BOARD_H = 306;
const JOINT = 8;
const TURN_IN = 16;
const FLAT_W = TURN_IN * 2 + BOARD_W * 2 + JOINT * 2 + SPINE_MM;
const FLAT_H = TURN_IN * 2 + BOARD_H;

export default function CaseArtwork() {
  return (
    <div
      className="case-flat"
      style={
        {
          "--flat-w": `${FLAT_W}mm`,
          "--flat-h": `${FLAT_H}mm`,
          "--board-w": `${BOARD_W}mm`,
          "--board-h": `${BOARD_H}mm`,
          "--spine-w": `${SPINE_MM}mm`,
          "--joint": `${JOINT}mm`,
          "--turn-in": `${TURN_IN}mm`,
        } as React.CSSProperties
      }
    >
      <div className="case-flat__turnin-note">
        Case artwork, flat. {FLAT_W} × {FLAT_H} mm including {TURN_IN} mm
        turn-ins. Board {BOARD_W} × {BOARD_H} mm, joint {JOINT} mm, spine{" "}
        {SPINE_MM} mm (152 pp block, Munken Pure 120 gsm, bulk 1.13 —
        confirm with binder). Board: GF Smith Colorplan, colour TBC with
        binder. Shown ground is a placeholder, not a print colour.
      </div>

      <div className="case-flat__boards">
        {/* Back board */}
        <div className="case-board case-board--back">
          <div className="case-legend">
            <p className="case-legend__title">Finishing legend</p>
            <p>
              <span className="case-legend__key case-legend__key--foil" /> Foil
              stamp, colour TBC with binder (paper white or brass)
            </p>
            <p>
              <span className="case-legend__key case-legend__key--blind" />{" "}
              Blind deboss, no foil
            </p>
            <p>Ribbon marker: marine or stone, TBC. Head and tail bands TBC.</p>
            <p>Endpapers: Colorplan, colour TBC against board.</p>
          </div>
        </div>

        {/* Spine */}
        <div className="case-spine">
          <p className="case-spine__wordmark case-foil">
            The First Owner&rsquo;s Reference
          </p>
          <p className="case-spine__edition case-foil">1st Edition · 2026</p>
        </div>

        {/* Front board */}
        <div className="case-board case-board--front">
          <p className="case-front__edition case-foil">1st Edition · 2026</p>
          <div className="case-front__title-block">
            <h1 className="case-front__wordmark case-foil">
              The First Owner&rsquo;s Reference
            </h1>
            <p className="case-front__strap case-foil">
              An annual editorial publication for first-time superyacht
              buyers.
            </p>
          </div>
          <div className="case-front__lighthouse case-blind">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/foreland-lighthouse-paper.svg" alt="" />
            <p className="case-annotation">BLIND DEBOSS</p>
          </div>
          <p className="case-front__publisher case-foil">
            Foreland Marine · London
          </p>
        </div>
      </div>
    </div>
  );
}

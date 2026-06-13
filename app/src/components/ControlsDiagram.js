import React from "react";

/*
 * Visual reference of the keyboard -> NES controller mapping.
 * The actual bindings live in the emulator engine (nes-emulator):
 *   Arrows = D-pad, C = A, X = B, Enter = Start, Shift = Select.
 * Shared by the first-run "How to Play" modal and the play-page Controls card.
 */

const Cap = ({ children, className = "" }) => (
  <span className={"keycap " + className}>{children}</span>
);

const Control = ({ cap, label, capClass = "", wide = false }) => (
  <div className="control-stack">
    <Cap className={(wide ? "keycap-wide " : "") + capClass}>{cap}</Cap>
    <span className="control-sub">{label}</span>
  </div>
);

class ControlsDiagram extends React.Component {
  render() {
    return (
      <div className="controls-diagram">
        <div className="controls-group">
          <div className="dpad-grid">
            <span className="empty" />
            <Cap>&#8593;</Cap>
            <span className="empty" />
            <Cap>&#8592;</Cap>
            <span className="empty" />
            <Cap>&#8594;</Cap>
            <span className="empty" />
            <Cap>&#8595;</Cap>
            <span className="empty" />
          </div>
          <div className="controls-group-label">Move</div>
        </div>

        <div className="controls-group">
          <div className="control-row">
            <Control cap="X" label="B" capClass="btn-cap" />
            <Control cap="C" label="A" capClass="btn-cap" />
          </div>
          <div className="controls-group-label">Buttons</div>
        </div>

        <div className="controls-group">
          <div className="control-row">
            <Control cap="Enter" label="START" wide={true} />
            <Control cap="Shift" label="SELECT" wide={true} />
          </div>
          <div className="controls-group-label">System</div>
        </div>
      </div>
    );
  }
}

export default ControlsDiagram;

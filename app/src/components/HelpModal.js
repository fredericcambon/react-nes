import React from "react";

import Modal from "./Modal";
import ControlsDiagram from "./ControlsDiagram";

class HelpModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onClose={this.props.onClose} title="How to Play">
        <p className="text-center" style={{ color: "var(--color-7)" }}>
          Play with your keyboard &mdash; here&rsquo;s the layout:
        </p>
        <ControlsDiagram />
      </Modal>
    );
  }
}

export default HelpModal;

import React from "react";

import Modal from "./Modal";

class BugModal extends React.Component {
  render() {
    var link = "https://github.com/fredericcambon/nes";
    return (
      <Modal show={this.props.show} onClose={this.props.onClose} title="Found a bug?">
        Please open an issue here if you find any bug with the emulator: <a href={link}>{link}</a>
      </Modal>
    );
  }
}

export default BugModal;

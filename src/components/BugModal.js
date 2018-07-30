import React from "react";

import Modal from "./Modal";

class BugModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onClose={this.props.onClose} title="Found a bug?">
        TODO
      </Modal>
    );
  }
}

export default BugModal;

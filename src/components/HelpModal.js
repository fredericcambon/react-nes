import React from "react";

import Modal from "./Modal";

class HelpModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onClose={this.props.onClose}
        title="How to Play?"
      >
        <table className="table table-inverse">
          <thead>
            <tr>
              <th>NES</th>
              <th>Keyboard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>X</td>
            </tr>
            <tr>
              <td>B</td>
              <td>C</td>
            </tr>
            <tr>
              <td>START</td>
              <td>Enter</td>
            </tr>
            <tr>
              <td>SELECT</td>
              <td>Shift</td>
            </tr>
            <tr>
              <td>&#8592;</td>
              <td>Left</td>
            </tr>
            <tr>
              <td>&#8593;</td>
              <td>Up</td>
            </tr>
            <tr>
              <td>&#8594;</td>
              <td>Right</td>
            </tr>
            <tr>
              <td>&#8595;</td>
              <td>Down</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}

export default HelpModal;

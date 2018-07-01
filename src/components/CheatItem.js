import React from "react";

class CheatItem extends React.Component {
  handleClick() {
    this.props.console.cpu.memory.write8(
      this.props.cheat.addr,
      this.props.cheat.value
    );
  }

  render() {
    return (
      <button
        type="button"
        className="list-group-item list-group-item-action"
        onClick={this.handleClick.bind(this)}
      >
        {this.props.cheat.title}
      </button>
    );
  }
}

export default CheatItem;

import React from "react";

class InfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.props.console.addObserver(this);
    this.state = { value: 0 };
  }

  notify(t, e) {
    let v =
      typeof this.props.info.value === "function"
        ? this.props.info.value(this.props.console)
        : this.props.console.cpu.memory.read8(this.props.info.value);

    if (v !== this.state.value) {
      this.setState({ value: v });
    }
  }

  render() {
    return (
      <p>
        {this.props.info.title}: {this.state.value}
      </p>
    );
  }
}

export default InfoItem;

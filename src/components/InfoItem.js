import React from "react";

class InfoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  componentDidMount() {
    setInterval(() => {
      let v =
        typeof this.props.info.value === "function"
          ? this.props.info.value(this.props.console)
          : this.props.console.cpu.memory.read8(this.props.info.value);

      if (v !== this.state.value) {
        this.setState({ value: v });
      }
    }, 1000);
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

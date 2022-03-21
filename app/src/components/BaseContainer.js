import React from "react";

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container-fluid grid">{this.props.children}</div>;
  }
}

export default BaseContainer;

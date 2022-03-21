import React from "react";
import { Link } from "react-router-dom";

import getTopRoms from "../utils/RomFilters";

import ROMList from "./ROMList";
import SearchROM from "./SearchROM";

class BaseGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="jumbotron shadow mt-5 color3" style={{ margin: "1rem" }}>
        <div className="container-fluid">{this.props.children}</div>
      </div>
    );
  }
}

export default BaseGrid;

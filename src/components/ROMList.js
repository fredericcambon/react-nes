import React from "react";

import ROMItem from "./ROMItem";

class ROMList extends React.Component {
  render() {
    return (
      <div className="row justify-content-center" style={{ marginTop: "2rem" }}>
        {this.props.roms.map((rom, index) => <ROMItem key={index} rom={rom} />)}
      </div>
    );
  }
}

export default ROMList;

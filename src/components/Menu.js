import React from "react";

import ROMList from "./ROMList";
import SearchROM from "./SearchROM";

class Menu extends React.Component {
  onSearchFilter = roms => {
    this.props.onSearchFilter(roms);
  };

  onSearchSelect = rom => {
    this.props.onSearchSelect(rom);
  };

  onSearchClose = () => {
    this.props.onSearchClose();
  };

  render() {
    var navBarStyle = {
      borderRadius: 0
    };

    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            NES
          </a>
        </div>
      </nav>
    );
  }
}

export default Menu;

import React from "react";
import { Link } from "react-router-dom";

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
        <div className="container-fluid">
          <a className="navbar-brand">
            <Link to="/">NES</Link>
          </a>
        </div>
      </nav>
    );
  }
}

export default Menu;

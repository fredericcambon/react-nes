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
      <nav className="navbar navbar-expand-lg color1 rounded">
        <a className="navbar-brand">
          <Link className="colorText5" to="/">
            <i class="fas fa-gamepad" /> <span> </span> onaNES
          </Link>
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/fredericcambon/react-nes">
              Github
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;

import React from "react";
import { NavLink, Link } from "react-router-dom";

import { ROMS } from "../utils/constants";
import ROMList from "./ROMList";
import BaseGrid from "./BaseGrid";
import BaseContainer from "./BaseContainer";

const LETTERS = ["0..9"].concat(
  [...Array(26).keys()].map(i => String.fromCharCode(i + 97).toUpperCase())
);

function sortByNames(roms) {
  return roms.sort((a, b) => (a.slug > b.slug ? 1 : -1));
}

function sortByStartsWith(roms, l) {
  return roms.filter(r => r.slug.charAt(0).toLowerCase() == l.toLowerCase());
}

class BrowseGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roms: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.filter) {
      return {
        roms: sortByNames(sortByStartsWith(ROMS, props.match.params.filter))
      };
    } else {
      return {
        roms: sortByNames(ROMS)
      };
    }
  }

  render() {
    return (
      <BaseContainer>
        <BaseGrid>
          <ul className="nav navbar">
            <li className="nav-item">
              <NavLink className="nav-link" to={`/browse-all`}>
                All
              </NavLink>
            </li>
            {LETTERS.map((l, index) => (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/browse/${l}`}>
                  {l}
                </NavLink>
              </li>
            ))}
          </ul>

          <ROMList roms={this.state.roms} />
        </BaseGrid>
      </BaseContainer>
    );
  }
}

export default BrowseGrid;

import React from "react";

import getTopRoms from "../utils/RomFilters";

import ROMList from "./ROMList";
import SearchROM from "./SearchROM";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.topRoms = getTopRoms();

    this.state = {
      roms: this.topRoms
    };
  }

  onSearchFilter = roms => {
    this.setState({
      roms: roms
    });
  };

  onSearchClose = () => {
    this.setState({
      roms: this.topRoms
    });
  };

  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form>
                <div className="form-row">
                  <div className="col-12">
                    <SearchROM
                      onFilter={this.onSearchFilter}
                      onSelect={this.onSearchSelect}
                      onClose={this.onSearchClose}
                      focus={this.props.focus}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="jumbotron"
          style={{ margin: "1rem", "background-color": "#333" }}
        >
          <div className="container-fluid">
            <div className="row justify-content-center" />
            <ROMList roms={this.state.roms} />
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;

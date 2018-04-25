import React from "react";

import getTopRoms from "../utils/RomFilters";

import ROMList from "./ROMList";
import SearchROM from "./SearchROM";

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.topRoms = getTopRoms();

    this.state = {
      roms: this.topRoms,
      title: "Top Games"
    };
  }

  onSearchFilter = roms => {
    this.setState({
      roms: roms,
      title: "Search Results"
    });
  };

  onSearchClose = () => {
    this.setState({
      roms: this.topRoms,
      title: "Top Games"
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
            <div className="row">
              <div className="col-lg-12">
                <h4 className="text-white">{this.state.title}</h4>
              </div>
            </div>
            <ROMList roms={this.state.roms} />
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;

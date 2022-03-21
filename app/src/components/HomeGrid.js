import React from "react";
import { Link } from "react-router-dom";

import getTopRoms from "../utils/RomFilters";

import ROMList from "./ROMList";
import SearchROM from "./SearchROM";
import BaseGrid from "./BaseGrid";
import BaseContainer from "./BaseContainer";

class HomeGrid extends React.Component {
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
      <BaseContainer>
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

        <BaseGrid>
          <ROMList roms={this.state.roms} />
          <div
            className="row justify-content-center"
            style={{ marginTop: "2rem" }}
          >
            <Link to="/browse-all" className="btn btn-lg color7 shadow">
              Browse All Games
            </Link>
          </div>
        </BaseGrid>
      </BaseContainer>
    );
  }
}

export default HomeGrid;

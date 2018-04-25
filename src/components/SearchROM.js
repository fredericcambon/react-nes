import React from "react";
import Select from "react-select";
import _ from "lodash";

import { ROMS } from "../utils/constants";

class SearchROM extends React.Component {
  constructor(props) {
    super(props);

    this.roms = ROMS;
  }

  onChange = event => {
    var value = event.target.value;

    if (value) {
      var results = _.filter(this.roms, r => {
        return r.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }).slice(0, 24);

      this.props.onFilter(results);
    } else {
      this.props.onClose();
    }
  };

  render() {
    return (
      <input
        onChange={this.onChange}
        options={this.roms}
        onClose={() => {
          this.props.onClose();
        }}
        placeholder="Search for games..."
        className="form-control form-control-lg"
      />
    );
  }
}

export default SearchROM;

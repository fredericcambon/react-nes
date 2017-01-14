import React from 'react';

import ROMList from './ROMList';
import SearchROM from './SearchROM';



class Menu extends React.Component {
    onSearchFilter = roms => {
        this.props.onSearchFilter( roms );
    }

    onSearchSelect = rom => {
        this.props.onSearchSelect( rom );
    }

    onSearchClose = () => {
        this.props.onSearchClose();
    }

    render() {
        var navBarStyle = {
            borderRadius: 0
        };

        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSearch" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <a className="navbar-brand" href="#"><i className="fa fa-gamepad" aria-hidden="true"></i></a>
                  <div className="collapse navbar-collapse" id="navbarSearch">
                      <div className="col-8">
                          <SearchROM onFilter={this.onSearchFilter} onSelect={this.onSearchSelect} onClose={this.onSearchClose} focus={this.props.focus} />
                      </div>
                  </div>
                </nav>


            </div>
        )
    }

}

export default Menu

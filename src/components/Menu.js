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
          <nav class="navbar navbar-dark bg-dark">
            <div class="container">
              <a class="navbar-brand" href="#">NES</a>
            </div>
          </nav>
        )
    }

}

export default Menu

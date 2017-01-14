import React from 'react';

import getTopRoms from '../utils/RomFilters';

import ROMList from './ROMList';
import Menu from './Menu';
import SearchROM from './SearchROM';


class Grid extends React.Component {
    constructor( props ) {
        super( props );

        this.topRoms = getTopRoms();

        this.state = {
            roms: this.topRoms,
            title: 'Cool Stuff'
        }
    }

    onSearchFilter( roms ) {
        this.setState( {
            roms: roms,
            title: 'Search Results'
        } );
    }

    onROMSelected = rom => {
        this.props.router.push( '/play/' + rom.slug );
    }

    onSearchClose() {
        this.setState( {
            roms: this.topRoms,
            title: 'Cool Stuff'
        } );
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                <Menu onSearchFilter={this.onSearchFilter} onSearchSelect={this.onROMSelected} onSearchClose={this.onSearchClose} focus={true} />
                <div className="jumbotron" style={{'margin': '1rem'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">{this.state.title}</h1>
                            </div>
                        </div>
                        <ROMList roms={this.state.roms} onROMSelected={this.onROMSelected} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid

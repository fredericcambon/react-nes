import React from 'react';
import Select from 'react-select';

import {
    ROMS
} from '../utils/constants';


class SearchROM extends React.Component {

    constructor( props ) {
        super( props );

        this.roms = ROMS;
    }

    onChange = rom => {
        this.props.onSelect( rom );
    }

    onInputChange = value => {
        if ( value ) {
            var results = _.filter( this.roms, ( r ) => {
                return r.label.toLowerCase().indexOf( value ) !== -1;
            } ).slice( 0, 24 );

            this.props.onFilter( results );
        } else {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Select placeholder="Search (Super Mario Bros, Zelda ...)" autofocus={this.props.focus} onInputChange={this.onInputChange} onChange={this.onChange} options={this.roms} onClose={() => {this.props.onClose()}} />
        )

    }
}

export default SearchROM

import React from 'react';
import Select from 'react-select';
import Console from 'nes';

import {
    DEBUG_ROMS
} from '../utils/constants';

import Screen from './Screen';


class DebugNES extends React.Component {

    constructor( props ) {
        super( props );
        this.console = new Console();
        this.state = {
            selectOption: null
        }
    }

    componentDidMount() {

    }

    onOptionSelect( rom ) {
        this.setState( {
            selectOption: rom
        } );

        this.console.loadROM( rom.filepath ).then( function ( res ) {
            this.console.start()
        }.bind( this ) );
    }

    render() {
        return (
            <div className="row">
                <Screen console={this.console}/>
                <Select name="form-field-name" value="one" options={DEBUG_ROMS} value={this.state.selectOption} onChange={this.onOptionSelect.bind(this)} autofocus clearable={false} searchable={false} />
            </div>
        )
    }
}


export default DebugNES

import _ from 'lodash';
import Console from 'nes';

import React from 'react';
import {
    withRouter
} from 'react-router'

import Screen from './Screen';
import Menu from './Menu';
import HelpModal from './HelpModal';
import {
    ROMS
} from '../utils/constants';


class NES extends React.Component {
    /*
     * Main component for the NES, handles the console status
     */

    constructor( props ) {
        super( props );

        this.rom = ROMS[ _.findIndex( ROMS, [ 'slug', this.props.match.params.game ] ) ];
        this.console = new Console();
        //this.props.router.setRouteLeaveHook( this.props.route, () => {
        //  return 'You have an ongoing game, are you sure you want to leave this page?';
        //} );
        this.state = {
            showHelpModal: false
        };
    }

    boot() {
        this.console.loadROM( this.rom.filepath ).then( function ( res ) {
            this.console.start()
        }.bind( this ) );
    }

    componentDidMount() {
        this.boot()
    }

    componentWillUnmount() {
        this.console.stop()
    }

    render() {
        var cardBackgroundStyle = {
            width: "100%",
            height: "100%",
            backgroundImage: 'url(' + this.rom.cover + ')',
            backgroundSize: "cover"
        }

        return (
            <div>
                <HelpModal show={this.state.showHelpModal} onClose={() => {this.setState({showHelpModal: false})}} />
                <div className="jumbotron" style={{'margin': '1rem'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">{this.rom.label}</h1>
                            </div>
                        </div>
                        <div className="row" style={{paddingTop: "20px"}}>
                            <div className="col-xl-8" style={{padding: 0}}>
                                <Screen console={this.console} onHelpClick={() => {this.setState({showHelpModal: true})}} />
                            </div>
                            <div className="col-xl-4">
                                <div style={cardBackgroundStyle}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter( NES )

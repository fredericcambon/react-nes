import React from 'react';

import ROMItem from './ROMItem';


class ROMList extends React.Component {
    render() {
        return (
            <div className="row" style={{marginTop: "2rem"}}>
                {this.props.roms.map((rom, index) => (
                    <ROMItem key={index} rom={rom} onClick={this.props.onROMSelected} />
                ))}
            </div>
        )
    }

}

export default ROMList

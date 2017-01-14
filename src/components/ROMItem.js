import React from 'react';

class ROMItem extends React.Component {
    render() {
        var cardStyle = {
            marginBottom: '1rem'
        }

        var cardBackgroundStyle = {
            borderBottomStyle: 'solid',
            borderWidth: '0.05rem',
            width: "100%",
            backgroundImage: 'url(' + this.props.rom.cover + ')',
            backgroundSize: "cover"
        }

        var cardFooterStyle = {}

        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2" style={cardStyle} onClick={() => {this.props.onClick( this.props.rom )}}>
                <div className="card-block" style={cardBackgroundStyle}>
                    <div style={{paddingTop: "100%"}}></div>
                </div>
                <div className="card-footer" style={cardFooterStyle}>
                  <h5 className="card-title">{this.props.rom.label}</h5>
                </div>
            </div>
        )
    }

}

export default ROMItem

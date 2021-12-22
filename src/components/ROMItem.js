import React from "react";
import { Link } from "react-router-dom";

class ROMItem extends React.Component {
  render() {
    var cardStyle = {
      marginBottom: "1rem",
      width: "15rem"
    };

    var cardBackgroundStyle = {
      borderWidth: "0.05rem",
      width: "100%",
      backgroundImage:
        "url(" +
        process.env.REACT_APP_MEDIA_HOST +
        "/" +
        process.env.REACT_APP_ROMS_PATH +
        this.props.rom.slug +
        ".jpg" +
        ")",
      backgroundSize: "cover"
    };

    var cardFooterStyle = {};

    return (
      <Link to={`/play/${this.props.rom.slug}`}>
        <div class="col-sm-3">
          <div className="card color2 shadow" style={cardStyle}>
            <div className="card-block" style={cardBackgroundStyle}>
              <div style={{ paddingTop: "100%" }} />
            </div>
            <div className="card-footer" style={cardFooterStyle}>
              <h5 className="card-title">{this.props.rom.label}</h5>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default ROMItem;

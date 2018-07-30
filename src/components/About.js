import React from "react";

class About extends React.Component {
  render() {
    var link = "https://github.com/fredericcambon/nes";

    return (
      <div className="container-fluid grid">
        <div className="jumbotron shadow color3" style={{ margin: "1rem" }}>
          <div className="container-fluid">
            <div className="row">
              <h3>onaNES, a Javascript NES emulator</h3>
            </div>
            <div className="row">
              This here is a React JS UI made for a&nbsp;
              <a className="strong-link" href={link}>
                NES emulator
              </a>. Feel free to use it or copy it as you see fit.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

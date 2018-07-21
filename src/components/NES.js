import _ from "lodash";
import React from "react";
import { withRouter } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { Console } from "nes-emulator";

import CheatItem from "./CheatItem";
import InfoItem from "./InfoItem";
import Screen from "./Screen";
import ThreeJS3DScreen from "./ThreeJS3DScreen";
import ThreeJSScreen from "./ThreeJSScreen.js";
import Menu from "./Menu";
import { ROMS, CHEATS, INFOS } from "../utils/constants";
import fetchROM from "../utils/Request";
const SCREEN_RENDERER = "Default";
const THREEJS_RENDERER = "ThreeJS";
const THREEJS_3D_RENDERER = "ThreeJS 3D";

class NES extends React.Component {
  /*
   * Main component for the NES, handles the console status
   */

  constructor(props) {
    super(props);

    this.rom = ROMS[_.findIndex(ROMS, ["slug", this.props.match.params.game])];
    this.cheats = CHEATS[this.props.match.params.game] || [];
    this.infos = INFOS[this.props.match.params.game] || [];
    this.console = new Console(60);

    // For debug purposes
    window.nes = this.console;

    // FIXME
    //this.props.router.setRouteLeaveHook( this.props.route, () => {
    //  return 'You have an ongoing game, are you sure you want to leave this page?';
    //} );
    this.renderers = {
      [SCREEN_RENDERER]: Screen,
      [THREEJS_RENDERER]: ThreeJSScreen,
      [THREEJS_3D_RENDERER]: ThreeJS3DScreen
    };
    this.state = {
      renderer: THREEJS_RENDERER
    };
  }

  boot() {
    fetchROM(this.rom.filepath).then(
      function(res) {
        this.console.loadROM(res.data);
        this.console.start();
      }.bind(this)
    );
  }

  componentDidMount() {
    this.boot();
  }

  componentWillUnmount() {
    this.console.stop();
  }

  onRendererSelected(option) {
    this.setState({
      renderer: option.value
    });
  }

  render() {
    const Renderer = this.renderers[this.state.renderer];
    const dropdownOptions = _.map(Object.keys(this.renderers), r => {
      return { value: r, label: r };
    });

    return (
      <div>
        <div className="jumbotron" style={{ margin: "1rem" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">{this.rom.label}</h1>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "20px" }}>
              <div className="col-xl-8">
                <Renderer console={this.console} />
              </div>
              <div className="col-xl-4">
                <h4>Renderer</h4>
                <Dropdown
                  options={dropdownOptions}
                  onChange={this.onRendererSelected.bind(this)}
                  value={this.state.renderer}
                />
                <h4>Cheats</h4>
                <ul className="list-group">
                  {this.cheats.map((cheat, index) => (
                    <CheatItem
                      key={index}
                      cheat={cheat}
                      console={this.console}
                    />
                  ))}
                </ul>
                <h4>Infos</h4>
                <ul className="list-group">
                  {this.infos.map((info, index) => (
                    <InfoItem key={index} info={info} console={this.console} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NES);

import _ from "lodash";
import React from "react";
import { withRouter } from "react-router-dom";
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
import BugModal from "./BugModal";

const SCREEN_RENDERER = "PixiJS";
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
      renderer: THREEJS_RENDERER,
      showBugModal: false
    };
  }

  boot() {
    fetchROM(this.rom).then(
      function (res) {
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

  onBugClick() { }

  render() {
    const Renderer = this.renderers[this.state.renderer];
    const dropdownOptions = _.map(Object.keys(this.renderers), r => {
      return { value: r, label: r };
    });

    return (
      <div className="container-fluid grid">
        <BugModal
          show={this.state.showBugModal}
          onClose={() => {
            this.setState({ showBugModal: false });
          }}
        />
        <div className="jumbotron shadow color3" style={{ margin: "1rem" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h3 className="page-header">{this.rom.label}</h3>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "20px" }}>
              <div className="col-xl-8">
                <Renderer console={this.console} />
              </div>
              <div className="col-xl-4">
                <div className="card color2 m-3">
                  <div className="card-header options-card-header">Renderer</div>
                  <Dropdown
                    options={dropdownOptions}
                    onChange={this.onRendererSelected.bind(this)}
                    value={this.state.renderer}
                  />
                </div>
                <div className="card color2 m-3">
                  <div className="card-header options-card-header">Cheats</div>
                  <ul className="list-group">
                    {this.cheats.map((cheat, index) => (
                      <CheatItem key={index} cheat={cheat} console={this.console} />
                    ))}
                  </ul>
                </div>
                <div className="card color2 m-3">
                  <div className="card-header options-card-header">Game Info</div>
                  <ul className="list-group mt-2" />
                </div>

                <div className="card color2 m-3">
                  <div className="card-header options-card-header">Runtime Info</div>
                  <ul className="list-group mt-2">
                    {this.infos.map((info, index) => (
                      <InfoItem key={index} info={info} console={this.console} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div
            className="btn-round float-right"
            onClick={() => {
              this.setState({ showBugModal: true });
            }}
          >
            <span>
              <i className="fas fa-bug" />
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(NES);

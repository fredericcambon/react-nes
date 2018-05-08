import _ from "lodash";
import Console from "nes";

import React from "react";
import { withRouter } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import Screen from "./Screen";
import ThreeJS3DScreen from "./ThreeJS3DScreen";
import ThreeJSScreen from "./ThreeJSScreen.js";
import Menu from "./Menu";
import HelpModal from "./HelpModal";
import { ROMS } from "../utils/constants";

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
    this.console = new Console();

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
      showHelpModal: false,
      renderer: SCREEN_RENDERER
    };
  }

  boot() {
    this.console.loadROM(this.rom.filepath).then(
      function(res) {
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

  _onRendererSelected(option) {
    this.setState({
      renderer: option.value
    });
  }

  render() {
    const Renderer = this.renderers[this.state.renderer];
    const renderersNames = Object.keys(this.renderers);

    return (
      <div>
        <HelpModal
          show={this.state.showHelpModal}
          onClose={() => {
            this.setState({ showHelpModal: false });
          }}
        />
        <div className="jumbotron" style={{ margin: "1rem" }}>
          <div className="container-fluid">
            <Dropdown
              options={renderersNames}
              onChange={this._onRendererSelected.bind(this)}
              value={{ SCREEN_RENDERER }}
              placeholder="Select an option"
            />

            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">{this.rom.label}</h1>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "20px" }}>
              <div className="col-xl-8" style={{ padding: 0 }}>
                <Renderer
                  console={this.console}
                  onHelpClick={() => {
                    this.setState({ showHelpModal: true });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NES);

import Observer from "./Observer";
import React from "react";
import HelpModal from "./HelpModal";

class BaseRenderer extends Observer {
  /*
   * Base component to handle the display of the NES at each frame
   */
  constructor(props) {
    super(props);
    this.console = props.console;

    this.console.addObserver(this);

    // Status
    this.state = {
      isPaused: false,
      fps: 0,
      showHelpModal: false
    };

    // Counters to monitor framerate
    this.frameCounter = 0;
    this.lastFpsTime = 0;
    this.fps = 0;
  }

  fpsLogger() {
    var now = new Date();

    this.fps = parseInt(this.frameCounter / ((now - this.lastFpsTime) / 1000));
    this.frameCounter = 0;
    this.lastFpsTime = now;
  }

  componentDidMount() {
    this.interval = setInterval(this.fpsLogger.bind(this), 1000);
    this.props.onInitCanvas(this.refs.canvasDst);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.console.removeObserver(this);
  }

  notify(t, e) {
    switch (t) {
      case "frame-ready": {
        this.frameCounter++;
        this.props.onRenderFrame(...e);
        break;
      }
      default: {
        this.onMessage(t);
        break;
      }
    }
  }

  fpsLogger() {
    var now = new Date();

    this.fps = parseInt(this.frameCounter / ((now - this.lastFpsTime) / 1000));
    this.frameCounter = 0;
    this.lastFpsTime = now;

    this.setState({ fps: this.fps });
  }

  onFullScreenClick = () => {
    this.refs.canvasDst.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  };

  onSaveClick = () => {
    this.console.quickSave();
  };

  onLoadClick = () => {
    this.console.loadQuickSave();
  };

  onPauseClick = () => {
    if (!this.state.isPaused) {
      this.console.stop();
    } else {
      this.console.start();
    }

    this.setState({
      isPaused: !this.state.isPaused
    });
  };

  onMessage(t) {
    switch (t) {
      case "nes-quick-save": {
        this.setState({ message: "Game Saved" });
        break;
      }
      case "nes-quick-load":
      case "nes-reset": {
        this.setState({ message: "Game Loaded" });
        break;
      }
    }

    setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);
  }

  render() {
    const fpsStyle = {
      position: "absolute",
      top: 10,
      left: 21,
      textAlign: "left",
      zIndex: "100",
      display: "block"
    };
    const messageStyle = {
      position: "absolute",
      left: "40%",
      top: "50%",
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold"
    };

    return (
      <div>
        <div id="fps" style={fpsStyle}>
          {this.state.fps} FPS
        </div>
        <div id="message" style={messageStyle}>
          {this.state.message}
        </div>

        <HelpModal
          show={this.state.showHelpModal}
          onClose={() => {
            this.setState({ showHelpModal: false });
          }}
        />

        <canvas id="nes-screen-canvas" ref="canvasDst" style={{ width: "100%", height: "100%" }} />
        <div
          id="overlay"
          style={{
            position: "absolute",
            bottom: 5,
            right: 21,
            zIndex: 2,
            height: "3rem",
            color: "black"
          }}
        >
          <div
            className="fa-stack fa-lg pull-right"
            onClick={() => {
              this.setState({ showHelpModal: true });
            }}
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-question fa-stack-1x fa-inverse" />
          </div>

          <div className="fa-stack fa-lg pull-right" onClick={this.onPauseClick}>
            <i className="fa fa-square fa-stack-2x" />
            {this.state.isPaused ? (
              <i className="fa fa-play fa-stack-1x fa-inverse" />
            ) : (
              <i className="fa fa-pause fa-stack-1x fa-inverse" />
            )}
          </div>
          <div className="fa-stack fa-lg pull-right" onClick={this.onSaveClick}>
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-save fa-stack-1x fa-inverse" />
          </div>

          <div className="fa-stack fa-lg pull-right" onClick={this.onLoadClick}>
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-sync-alt fa-stack-1x fa-inverse" />
          </div>

          <div className="fa-stack fa-lg pull-right" onClick={this.onFullScreenClick}>
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-expand fa-stack-1x fa-inverse" />
          </div>
        </div>
      </div>
    );
  }
}

export default BaseRenderer;

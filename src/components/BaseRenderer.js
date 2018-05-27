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
      case "nes-reset": {
        this.props.onMessage(t);
        break;
      }
    }
  }

  fpsLogger() {
    var now = new Date();

    this.fps = parseInt(this.frameCounter / ((now - this.lastFpsTime) / 1000));
    this.frameCounter = 0;
    this.lastFpsTime = now;

    this.props.onUpdateMeta({ fps: this.fps });
  }

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

  render() {
    return (
      <div>
        <HelpModal
          show={this.state.showHelpModal}
          onClose={() => {
            this.setState({ showHelpModal: false });
          }}
        />
        <canvas
          className="nes-screen-canvas"
          ref="canvasDst"
          style={{ width: "100%", height: "100%" }}
        />
        <div
          id="overlay"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 21,
            zIndex: 2,
            height: "3rem"
          }}
        >
          <div
            className="fa-stack fa-lg pull-right"
            onClick={this.props.onFullScreenClick}
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-expand fa-stack-1x fa-inverse" />
          </div>
          <div
            className="fa-stack fa-lg pull-right"
            onClick={this.onPauseClick}
          >
            <i className="fa fa-square fa-stack-2x" />
            {this.state.isPaused ? (
              <i className="fa fa-play fa-stack-1x fa-inverse" />
            ) : (
              <i className="fa fa-pause fa-stack-1x fa-inverse" />
            )}
          </div>
          <div className="fa-stack fa-lg pull-right">
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-floppy-o fa-stack-1x fa-inverse" />
          </div>
          <div
            className="fa-stack fa-lg pull-right"
            onClick={() => {
              this.setState({ showHelpModal: true });
            }}
          >
            <i className="fa fa-square fa-stack-2x" />
            <i className="fa fa-question fa-stack-1x fa-inverse" />
          </div>
        </div>
      </div>
    );
  }
}

export default BaseRenderer;
